// Script for Image Modal Lightbox and Accessibility on Birthday Invitation

// Wait until DOM fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create modal elements
  const modalOverlay = document.createElement('div');
  modalOverlay.style.position = 'fixed';
  modalOverlay.style.top = 0;
  modalOverlay.style.left = 0;
  modalOverlay.style.width = '100vw';
  modalOverlay.style.height = '100vh';
  modalOverlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
  modalOverlay.style.display = 'flex';
  modalOverlay.style.alignItems = 'center';
  modalOverlay.style.justifyContent = 'center';
  modalOverlay.style.opacity = 0;
  modalOverlay.style.pointerEvents = 'none';
  modalOverlay.style.transition = 'opacity 0.3s ease';
  modalOverlay.style.zIndex = 1000;
  modalOverlay.setAttribute('aria-hidden', 'true');

  // Modal img element
  const modalImage = document.createElement('img');
  modalImage.style.maxWidth = '90vw';
  modalImage.style.maxHeight = '90vh';
  modalImage.style.borderRadius = '12px';
  modalImage.style.boxShadow = '0 4px 20px rgba(255,255,255,0.9)';
  modalImage.alt = '';

  // Append image to overlay
  modalOverlay.appendChild(modalImage);
  document.body.appendChild(modalOverlay);

  // Function to open modal
  function openModal(src, alt) {
    modalImage.src = src;
    modalImage.alt = alt || '';
    modalOverlay.style.pointerEvents = 'auto';
    modalOverlay.style.opacity = '1';
    modalOverlay.setAttribute('aria-hidden', 'false');
    // Prevent body scroll when modal open
    document.body.style.overflow = 'hidden';
    // Focus on modal for keyboard
    modalOverlay.focus();
  }

  // Function to close modal
  function closeModal() {
    modalOverlay.style.opacity = '0';
    modalOverlay.style.pointerEvents = 'none';
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalImage.src = '';
  }

  // Click modal overlay closes modal
  modalOverlay.addEventListener('click', closeModal);

  // Close modal on pressing ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  // Attach click listeners to invitation images
  const images = document.querySelectorAll('.photos img, .photo-gallery img');

  images.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      openModal(img.src, img.alt);
    });

    // Make keyboard accessible: open modal on Enter or Space key
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(img.src, img.alt);
      }
    });
  });
});
