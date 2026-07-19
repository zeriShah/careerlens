import { Router, Request, Response } from 'express';
import prisma from '../config/db';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// 1. RevenueCat Webhook (Receives purchase/cancellation status updates)
router.post('/revenuecat-webhook', async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    
    // Validate that payload contains event details
    if (!payload || !payload.event) {
      return res.status(400).json({ error: 'Invalid webhook payload structure' });
    }

    const { type, app_user_id, expiration_at_ms, entitlement_ids } = payload.event;
    console.log(`[RevenueCat Webhook]: Received event type: ${type} for User ID: ${app_user_id}`);

    if (!app_user_id) {
      return res.status(400).json({ error: 'Missing app_user_id' });
    }

    // Determine subscription status
    // INITIAL_PURCHASE, RENEWAL, SUBSCRIBED, etc.
    const isProEvent = ['INITIAL_PURCHASE', 'RENEWAL', 'PRODUCT_CHANGE', 'NON_RENEWING_PURCHASE'].includes(type);
    const isCancelEvent = ['CANCELLATION', 'EXPIRATION'].includes(type);

    let status = 'free';
    let expiresAt: Date | null = null;

    if (expiration_at_ms) {
      expiresAt = new Date(expiration_at_ms);
      // Check if expiration date is in the future
      if (expiresAt.getTime() > Date.now()) {
        status = 'active';
      }
    } else if (isProEvent) {
      status = 'active';
    }

    if (isCancelEvent) {
      status = 'free';
      expiresAt = null;
    }

    // Update user record in database
    await prisma.user.update({
      where: { id: app_user_id },
      data: {
        subscriptionStatus: status,
        subscriptionExpiresAt: expiresAt,
        revenuecatId: payload.event.original_app_user_id || undefined
      }
    });

    console.log(`[RevenueCat Webhook Success]: Set user ${app_user_id} subscription status to "${status}"`);
    return res.json({ success: true });
  } catch (err: any) {
    console.error('[RevenueCat Webhook Error]:', err);
    return res.status(500).json({ error: `Failed to process webhook: ${err.message || 'Unknown error'}` });
  }
});

// 2. Mock Activation Route (Convenient for testing during development)
router.post('/mock-activate', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { action } = req.body; // "activate" or "cancel"

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: action === 'activate' ? 'active' : 'free',
        subscriptionExpiresAt: action === 'activate' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null
      }
    });

    return res.json({
      success: true,
      message: action === 'activate' ? 'Simulated Pro Upgrade Success!' : 'Reverted back to free plan.',
      user: {
        id: updatedUser.id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        subscriptionStatus: updatedUser.subscriptionStatus
      }
    });
  } catch (err: any) {
    console.error('[Mock Activate Error]:', err);
    return res.status(500).json({ error: `Mock activation failed: ${err.message || 'Unknown error'}` });
  }
});

export default router;
