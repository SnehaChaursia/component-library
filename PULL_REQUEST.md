## 📝 Description

This PR enhances the Badge component by adding PropTypes validation and defaultProps, improving code quality and maintainability. The changes include:

1. Added PropTypes validation for all props in both Badge and Chip components
2. Added defaultProps for optional props
3. Imported PropTypes package at the top of the file
4. Maintained all existing functionality without any breaking changes

Fixes #000
Closes #000

---

## 🔍 Type of Change

Please delete options that are not relevant.

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] 🚀 New feature (non-breaking change that adds functionality)
- [x] 🧹 Code cleanup or refactor
- [ ] 🧾 Documentation update
- [ ] 🧪 Test addition or update
- [ ] 🧠 Other (please describe):

---

## ✅ Checklist

- [x] My code follows the project's coding style and guidelines.
- [x] I have performed a self-review of my code.
- [ ] I have commented my code where necessary.
- [ ] I have added tests that prove my fix is effective or that my feature works.
- [ ] New and existing tests pass locally with my changes.
- [ ] I have updated the documentation if required.

---

## 💬 Additional Comments

This enhancement adds prop validation to the Badge component, which improves code reliability and provides better developer experience. The PropTypes validation helps catch potential bugs during development and follows React best practices.

The changes are non-breaking and maintain all existing functionality while adding an additional layer of type safety.