## 📝 Description

This PR adds PropTypes validation to several button components in the library to improve code reliability and developer experience. It follows React best practices and enhances the overall quality of the component library.

This addresses the issue of missing PropTypes validation in button components, which can lead to runtime errors and make it harder for developers to understand the expected props for each component.

Fixes #<issue_number_to_be_created>

---

## 🔍 Type of Change

- [x] 🚀 New feature (non-breaking change that adds functionality)
- [x] 🧪 Test addition or update
- [x] 🧾 Documentation update

---

## ✅ Changes Made

1. Added PropTypes validation to PrimaryButton component
2. Added PropTypes validation to SecondaryButton component
3. Added PropTypes validation to DangerButton component
4. Created test files for all three button components
5. Created an issue template for PropTypes enhancement for button components

---

## 🧪 Tests Added

- PrimaryButton.test.jsx
- SecondaryButton.test.jsx
- DangerButton.test.jsx

Each test file includes:
- Rendering tests
- CSS class validation tests
- Additional prop validation tests

---

## 📋 Checklist

- [x] My code follows the project's coding style and guidelines.
- [x] I have performed a self-review of my code.
- [x] I have commented my code where necessary.
- [x] I have added tests that prove my changes are effective.
- [x] New and existing tests pass locally with my changes.
- [x] I have updated the documentation if required.

---

## 💬 Additional Comments

This PR is a good first contribution for Hacktoberfest participants and improves the overall quality of the component library. The Badge component already had PropTypes implemented, which served as a reference for this implementation.