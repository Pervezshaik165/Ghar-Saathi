function escapeHtml(str) {
  if (!str && str !== 0) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function baseFooter(doc) {
  const time = doc.createdAt ? new Date(doc.createdAt).toLocaleString() : new Date().toLocaleString();
  return `<hr/><p>Received: ${escapeHtml(time)}</p>`;
}

function hireTemplate(doc) {
  return `
    <h2>New Hire Request</h2>
    <p><strong>Name:</strong> ${escapeHtml(doc.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(doc.email || '')}</p>
    <p><strong>Phone:</strong> ${escapeHtml(doc.phone || '')}</p>
    <p><strong>Service:</strong> ${escapeHtml(doc.service || '')}</p>
    <p><strong>Address:</strong> ${escapeHtml(doc.address || '')}</p>
    <p><strong>Notes:</strong> ${escapeHtml(doc.notes || '')}</p>
    ${baseFooter(doc)}
  `;
}

function becomeHelperTemplate(doc) {
  const name = escapeHtml(doc.name || 'N/A');
  const email = escapeHtml(doc.email || 'N/A');
  const phone = escapeHtml(doc.phone || 'N/A');
  const skills = escapeHtml(doc.skills || 'N/A');
  const expectedFeeRange = escapeHtml(doc.expectedFeeRange || 'N/A');
  const experience = escapeHtml(doc.experience || 'N/A');
  const portfolio = escapeHtml(doc.portfolio || 'N/A');
  const address = escapeHtml(doc.address || 'N/A');

  return `
    <h2>Become Helper Application</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Skills:</strong> ${skills}</p>
    <p><strong>Expected Fee:</strong> ${expectedFeeRange}</p>
    <p><strong>Experience:</strong> ${experience}</p>
    <p><strong>Portfolio:</strong> ${portfolio}</p>
    <p><strong>Address:</strong> ${address}</p>
    ${baseFooter(doc)}
  `;
}

function quickInquiryTemplate(doc) {
  return `
    <h2>Quick Inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(doc.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(doc.email || '')}</p>
    <p><strong>Phone:</strong> ${escapeHtml(doc.phone || '')}</p>
    <p><strong>Message:</strong><br/>${escapeHtml(doc.message || '')}</p>
    ${baseFooter(doc)}
  `;
}

module.exports = { hireTemplate, becomeHelperTemplate, quickInquiryTemplate };
