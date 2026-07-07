import { jsPDF } from 'jspdf';

interface ContactInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
}

interface WorkExperience {
  title: string;
  company: string;
  dates: string;
  bullets: string[];
}

interface KeyProject {
  name: string;
  bullets: string[];
}

interface Education {
  degree: string;
  field?: string;
  institution: string;
  dates: string;
}

export interface TailoredResumeData {
  contact_info: ContactInfo;
  professional_summary: string;
  work_experience: WorkExperience[];
  projects?: KeyProject[];
  education: Education[];
  skills: string[];
  certifications?: string[];
}

export function generateTailoredResumePDF(
  resume: TailoredResumeData,
  themeColorHex: string = '#0f172a',
  fontFamily: string = 'helvetica'
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - (margin * 2);
  let y = 50;

  // Hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 15, g: 23, b: 42 };
  };

  const primaryRGB = hexToRgb(themeColorHex);

  // Font Mapping
  let pdfFont = 'helvetica';
  if (['times', 'georgia', 'garamond'].includes(fontFamily)) {
    pdfFont = 'times';
  } else if (fontFamily === 'courier') {
    pdfFont = 'courier';
  }

  // Helper to ensure text stays within A4 bounds, triggering page split if needed
  const checkPage = (heightNeeded: number) => {
    if (y + heightNeeded > pageHeight - 50) {
      doc.addPage();
      y = 50;
    }
  };

  // 1. Header Information
  doc.setFont(pdfFont, 'bold');
  doc.setFontSize(22);
  doc.setTextColor(primaryRGB.r, primaryRGB.g, primaryRGB.b);
  const name = resume.contact_info.name || 'Resume';
  const nameWidth = doc.getTextWidth(name);
  doc.text(name, (pageWidth - nameWidth) / 2, y);
  y += 24;

  // Subtitle
  if (resume.contact_info.title) {
    doc.setFont(pdfFont, 'bold');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const title = resume.contact_info.title.toUpperCase();
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, y);
    y += 18;
  }

  // Contact Row
  doc.setFont(pdfFont, 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(120, 120, 120);
  const contactParts: string[] = [];
  if (resume.contact_info.location) contactParts.push(resume.contact_info.location);
  if (resume.contact_info.email) contactParts.push(resume.contact_info.email);
  if (resume.contact_info.phone) contactParts.push(resume.contact_info.phone);
  if (resume.contact_info.website) contactParts.push(resume.contact_info.website);
  
  const contactStr = contactParts.join('  |  ');
  const contactWidth = doc.getTextWidth(contactStr);
  doc.text(contactStr, (pageWidth - contactWidth) / 2, y);
  y += 12;

  // Divider Line
  doc.setDrawColor(primaryRGB.r, primaryRGB.g, primaryRGB.b);
  doc.setLineWidth(1.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  // Section Heading Helper
  const drawSectionHeading = (title: string) => {
    checkPage(35);
    doc.setFont(pdfFont, 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryRGB.r, primaryRGB.g, primaryRGB.b);
    doc.text(title.toUpperCase(), margin, y);
    y += 4;
    doc.setDrawColor(primaryRGB.r, primaryRGB.g, primaryRGB.b);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 14;
  };

  // 2. Professional Summary Section
  if (resume.professional_summary) {
    drawSectionHeading('Professional Summary');
    doc.setFont(pdfFont, 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(40, 40, 40);
    
    const lines = doc.splitTextToSize(resume.professional_summary, contentWidth);
    checkPage(lines.length * 14);
    doc.text(lines, margin, y);
    y += (lines.length * 14) + 16;
  }

  // 3. Work Experience Section
  if (resume.work_experience && resume.work_experience.length > 0) {
    drawSectionHeading('Work Experience');
    
    resume.work_experience.forEach((exp) => {
      // Check title header height
      checkPage(30);
      
      // Job Title and Dates Row
      doc.setFont(pdfFont, 'bold');
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(exp.title, margin, y);
      
      doc.setFont(pdfFont, 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(50, 50, 50);
      const datesWidth = doc.getTextWidth(exp.dates);
      doc.text(exp.dates, pageWidth - margin - datesWidth, y);
      y += 14;

      // Company Info Row
      doc.setFont(pdfFont, fontFamily === 'mono' ? 'normal' : 'italic');
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      doc.text(exp.company, margin, y);
      y += 10;

      // Bullets
      if (exp.bullets && exp.bullets.length > 0) {
        doc.setFont(pdfFont, 'normal');
        doc.setFontSize(9);
        doc.setTextColor(40, 40, 40);
        
        exp.bullets.forEach((bullet) => {
          if (!bullet.trim()) return;
          const bulletPrefix = '•  ';
          const prefixWidth = doc.getTextWidth(bulletPrefix);
          const bulletLines = doc.splitTextToSize(bullet, contentWidth - prefixWidth - 10);
          
          checkPage(bulletLines.length * 13 + 4);
          doc.text(bulletPrefix, margin + 5, y);
          doc.text(bulletLines, margin + 5 + prefixWidth, y);
          y += (bulletLines.length * 13) + 3;
        });
      }
      y += 8;
    });
  }

  // 3.5. Key Projects Section
  if (resume.projects && resume.projects.length > 0) {
    drawSectionHeading('Key Projects');
    
    resume.projects.forEach((proj) => {
      checkPage(24);
      
      // Project Name Row
      doc.setFont(pdfFont, 'bold');
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(proj.name, margin, y);
      y += 12;

      // Bullets
      if (proj.bullets && proj.bullets.length > 0) {
        doc.setFont(pdfFont, 'normal');
        doc.setFontSize(9);
        doc.setTextColor(40, 40, 40);
        
        proj.bullets.forEach((bullet) => {
          if (!bullet.trim()) return;
          const bulletPrefix = '•  ';
          const prefixWidth = doc.getTextWidth(bulletPrefix);
          const bulletLines = doc.splitTextToSize(bullet, contentWidth - prefixWidth - 10);
          
          checkPage(bulletLines.length * 13 + 4);
          doc.text(bulletPrefix, margin + 5, y);
          doc.text(bulletLines, margin + 5 + prefixWidth, y);
          y += (bulletLines.length * 13) + 3;
        });
      }
      y += 6;
    });
  }

  // 4. Education Section
  if (resume.education && resume.education.length > 0) {
    drawSectionHeading('Education');
    
    resume.education.forEach((edu) => {
      checkPage(35);
      
      const degreeText = `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}`;
      doc.setFont(pdfFont, 'bold');
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(degreeText, margin, y);
      
      doc.setFont(pdfFont, 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(50, 50, 50);
      const eduDatesWidth = doc.getTextWidth(edu.dates);
      doc.text(edu.dates, pageWidth - margin - eduDatesWidth, y);
      y += 14;

      doc.setFont(pdfFont, 'normal');
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      doc.text(edu.institution, margin, y);
      y += 18;
    });
  }

  // 5. Skills Section
  if (resume.skills && resume.skills.length > 0) {
    drawSectionHeading('Skills');
    
    doc.setFont(pdfFont, 'normal');
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    
    // Chunk skills (up to 6 per line)
    const lines: string[] = [];
    for (let i = 0; i < resume.skills.length; i += 6) {
      lines.push(resume.skills.slice(i, i + 6).join(', '));
    }
    
    checkPage(lines.length * 13);
    lines.forEach((line) => {
      doc.text(line, margin, y);
      y += 13;
    });
    y += 10;
  }

  // 6. Certifications Section
  if (resume.certifications && resume.certifications.length > 0) {
    drawSectionHeading('Certifications');
    
    doc.setFont(pdfFont, 'normal');
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    
    resume.certifications.forEach((cert) => {
      if (!cert.trim()) return;
      checkPage(13);
      doc.text(`•  ${cert}`, margin, y);
      y += 13;
    });
  }

  // Trigger Download
  doc.save(`${name.replace(/\s+/g, '_')}_tailored_resume.pdf`);
}
