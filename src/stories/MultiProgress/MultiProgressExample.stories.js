import MultiProgressExample from "./MultiProgressExample";

export default {
  title: "Example/MultiProgressExample",
  component: MultiProgressExample,
  argTypes: {
    progressItem: {
      control: {
        type: "object",
      },
    },
  },
};

export const MultiProgress1 = {
  args: {
    progressItem: {
      totalScenesCount: 10,
      data: [
        {
          name: "Open",
          count: 2,
        },
        {
          name: "Assigned",
          count: 3,
        },
        {
          name: "Submitted",
          count: 2,
        },
        {
          name: "Approved",
          count: 3,
        },
      ],
    },
  },
};

export const MultiProgress2 = {
  args: {
    progressItem: {
      totalScenesCount: 20,
      data: [
        {
          name: "Open",
          count: 6,
        },
        {
          name: "Assigned",
          count: 4,
        },
        {
          name: "Submitted",
          count: 3,
        },
        {
          name: "Approved",
          count: 7,
        },
      ],
    },
  },
};
