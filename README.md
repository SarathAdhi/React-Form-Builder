# React Forms - Build React Forms Effortlessly

<img src="https://react-forms.sarathadhi.com/assets/logo.png" width="100" />

**A powerful playground to build React form components using your preferred library** — whether it’s **React Hook Form**, **Formik**, or **TanStack Form**. Designed with **shadcn/ui** components, React Forms Playground provides copy-paste ready code, enabling you to create and test forms quickly and efficiently.

[Visit React Forms](https://react-forms.sarathadhi.com/)

---

## Features

- **Supports Major Form Libraries**: Build forms using React Hook Form, Formik, or TanStack Form, depending on your project requirements.
- **No-Code Form Creation**: Use the intuitive drag-and-drop builder to create forms without writing code.
- **Copy-Paste Ready Code**: Generate fully-functional, formatted code you can copy directly into your React application.
- **shadcn/ui Integration**: All components are styled with shadcn/ui, ensuring a polished, professional appearance.
- **Live Preview**: See how your form behaves as you build it, with real-time validation and error handling.
- **Customizable Field Options**: Modify field properties, validation rules, and error messages to fit your exact requirements.
- **Responsive Design**: Preview how your form looks on different screen sizes for optimal mobile and desktop layouts.

---

## Getting Started

### How to Use

1. **Choose Your Library**: Start by selecting React Hook Form, Formik, or TanStack Form to ensure your form setup matches your project's requirements.
2. **Form Builder**: Use the builder to add fields, set validations, and arrange form elements as desired.
3. **Customize Fields**: Adjust field properties, add labels, placeholders, and specify validation rules directly in the playground.
4. **Preview and Export Code**: Test your form in the live preview, then copy the generated code to integrate it into your application.

### Example Use Cases

- **Rapid Prototyping**: Quickly create form prototypes for different projects or clients.
- **Learning and Experimentation**: Try out different libraries and form configurations to see how they work in a React environment.
- **Speed Up Development**: Generate clean, reusable code that you can paste directly into your React application.

## Components

Form Builder consists of various reusable components:

- **Form**: The main container for the form elements where we handle all the context.
- **[Components]FormField**: A customizable field components like input, select, textarea, switch, file upload, etc.
- **Button**: A styled button component for form submission.

## Validation

Form Builder utilizes [Zod](https://zod.dev/) for input validation. You can define schemas for your forms as follows:

```javascript
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});
```

This schema can be applied to your form to enforce validation rules.

---

## Installation

To get started with Form Builder, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/SarathAdhi/React-Form-Builder.git
   ```

2. Navigate into the project directory:

   ```bash
   cd React-Form-Builder
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```

## Usage

To start the development server, run:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.

---

## Contributing

Contributions are welcome! If you would like to contribute to Form Builder, please follow these steps:

1. **Fork the Repository**: Click on the “Fork” button at the top right corner of the repository page.
2. **Create a Branch**:
   ```bash
   git checkout -b feature/<feature_name>
   ```
3. **Make Changes**: Implement your feature or fix.
4. **Commit Changes**:
   ```bash
   git commit -m "<relevent message>"
   ```
5. **Push Changes**:
   ```bash
   git push origin feature/<feature_name>
   ```
6. **Create a Pull Request**: Go to the original repository and create a pull request.

We welcome feedback and suggestions! Please reach out through [hello@sarathadhi.com](mailto:support@sarathadhi.com).

---

## License

This project is licensed under the MIT License.

---

> **React Forms Playground** – The ultimate tool for building and testing dynamic forms with your preferred React form library.

---

## Acknowledgements

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Next.js](https://nextjs.org/) - The React framework for production.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework packed with classes that can be composed to build any design.
- [Zod](https://zod.dev/) - TypeScript-first schema declaration and validation.
- [React Hook Form](https://react-hook-form.com/) - Performant, flexible, and extensible forms with easy-to-use validation.
- [Formik](https://formik.org/) - Build forms in React with the most popular form library.
- [TanStack Form](https://tanstack.com/) - A simple, flexible, and extensible form library for React.
- [shadcn/ui](https://shadcn.com/ui) - A collection of React components for building modern web applications.
- [Vercel](https://vercel.com/) - The platform for deploying React applications.
