import React from "react";

const preview = {
  decorators: [
    (Story) => (
      <div style={{ margin: "3em 0", height: "100%", width: "100%" }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        {Story()}
      </div>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
