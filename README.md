# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# TODO App

Esta es una aplicación de tareas pendientes desarrollada con React, TypeScript, Zustand, y TailwindCSS. La aplicación permite gestionar tareas, cambiar entre modo claro y oscuro, y tiene varias características modernas para mejorar la experiencia del usuario.

## Características
- **Agregar, completar y eliminar tareas** con confirmación antes de eliminar.
- **Persistencia de datos** utilizando `localStorage` para mantener las tareas guardadas incluso después de recargar la página.
- **Modo Claro/Oscuro** para ajustar la apariencia de la aplicación.
- **Animaciones suaves** al agregar y eliminar tareas.
- **Campo de búsqueda** para filtrar tareas por título.
- **Orden y filtros** para organizar las tareas por estado (completadas, pendientes) y por orden alfabético o de fecha.
- **Notificaciones suaves** usando `react-toastify` para informar al usuario sobre las acciones realizadas.