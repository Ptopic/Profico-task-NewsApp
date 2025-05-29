export const handleTabNavigation = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  if (event.key === 'Tab' && !event.shiftKey) {
    const form = event.currentTarget.form;
    if (form) {
      const focusableElements =
        form.querySelectorAll<HTMLInputElement>('input');

      const currentIndex = Array.from(focusableElements).indexOf(
        document.activeElement as HTMLInputElement
      );

      if (currentIndex >= 0 && currentIndex < focusableElements.length - 1) {
        event.preventDefault();
        focusableElements[currentIndex + 1].focus();
      }
    }
  }
};
