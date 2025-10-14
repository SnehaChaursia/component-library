## 📝 Description

This PR enhances the accessibility of several components in the library by adding proper ARIA attributes, keyboard navigation support, and semantic HTML improvements. The changes include:

1. **DatePicker Component**:
   - Replaced inline styles with CSS classes
   - Added proper labeling with htmlFor association
   - Added ARIA attributes for required fields
   - Improved focus states and disabled states
   - Added time element for semantic date representation

2. **Accordion Component**:
   - Added keyboard navigation support (Arrow keys, Home, End)
   - Added proper ARIA roles (region, button, region)
   - Added aria-expanded, aria-controls, and aria-labelledby attributes
   - Improved focus management
   - Added semantic HTML structure with h3 tags

3. **ProgressBar Component**:
   - Added comprehensive ARIA attributes (aria-valuenow, aria-valuemin, aria-valuemax)
   - Added support for aria-label and aria-labelledby
   - Improved labeling options
   - Added PropTypes validation

4. **PrimaryButton Component**:
   - Added aria-label and aria-describedby support
   - Improved disabled state styling
   - Enhanced focus states
   - Added PropTypes validation

Fixes #000
Closes #000

---

## 🔍 Type of Change

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] 🚀 New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [x] 🧹 Code cleanup or refactor
- [ ] 🧾 Documentation update
- [ ] 🧪 Test addition or update
- [ ] 🧠 Other (please describe):

---

## ✅ Checklist

- [x] My code follows the project's coding style and guidelines.
- [x] I have performed a self-review of my code.
- [x] I have commented my code where necessary.
- [ ] I have added tests that prove my fix is effective or that my feature works.
- [ ] New and existing tests pass locally with my changes.
- [ ] I have updated the documentation if required.

---

## 💬 Additional Comments

These accessibility improvements enhance the component library by making it more inclusive and usable for people with disabilities. The changes follow WCAG 2.1 guidelines and ensure proper keyboard navigation, screen reader compatibility, and semantic HTML structure.

The improvements include:
- Proper ARIA attributes for all interactive elements
- Keyboard navigation support for complex components
- Semantic HTML structure
- Focus management
- Screen reader compatibility
- Visual focus indicators