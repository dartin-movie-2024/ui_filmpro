import { PATHS } from "./URLConstants";

export const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed nisi lacus sed viverra tellus in hac habitasse. Ac odio tempor orci dapibus ultrices in iaculis. Tellus at urna condimentum mattis pellentesque. Proin sed libero enim sed faucibus turpis in eu. Vestibulum lectus mauris ultrices eros. Ultricies tristique nulla aliquet enim. Varius duis at consectetur lorem donec massa sapien faucibus. Pellentesque pulvinar pellentesque habitant morbi. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque.

Neque aliquam vestibulum morbi blandit. In ante metus dictum at tempor commodo. Dictum at tempor commodo ullamcorper a lacus vestibulum sed. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Ut diam quam nulla porttitor massa. Pretium viverra suspendisse potenti nullam ac tortor vitae. Viverra suspendisse potenti nullam ac tortor vitae. In aliquam sem fringilla ut morbi. Id nibh tortor id aliquet lectus proin nibh nisl. Amet dictum sit amet justo donec. Neque volutpat ac tincidunt vitae semper quis lectus nulla.

Penatibus et magnis dis parturient montes nascetur ridiculus. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi. Laoreet id donec ultrices tincidunt arcu non sodales. Vulputate dignissim suspendisse in est ante in nibh. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Nulla pharetra diam sit amet. Curabitur gravida arcu ac tortor dignissim convallis aenean et. Tristique nulla aliquet enim tortor at auctor urna nunc id. Amet aliquam id diam maecenas ultricies mi eget mauris. Blandit aliquam etiam erat velit. Placerat duis ultricies lacus sed turpis tincidunt id aliquet risus. Risus nec feugiat in fermentum posuere urna. Fringilla ut morbi tincidunt augue interdum velit euismod. Quam viverra orci sagittis eu. Ut sem viverra aliquet eget sit. Vulputate dignissim suspendisse in est ante in nibh mauris cursus.

Dui sapien eget mi proin sed. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Pharetra magna ac placerat vestibulum lectus. Ac tortor vitae purus faucibus. Volutpat ac tincidunt vitae semper quis lectus nulla at. Senectus et netus et malesuada. Dignissim convallis aenean et tortor at. Blandit massa enim nec dui nunc mattis enim. In arcu cursus euismod quis viverra. Integer vitae justo eget magna fermentum iaculis eu non. Ut aliquam purus sit amet luctus venenatis lectus magna. In iaculis nunc sed augue lacus viverra.

Mattis nunc sed blandit libero volutpat sed cras ornare. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. Mattis molestie a iaculis at erat. Faucibus pulvinar elementum integer enim. Tellus at urna condimentum mattis pellentesque id nibh tortor. Purus gravida quis blandit turpis cursus. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi. Blandit turpis cursus in hac habitasse platea. Lorem sed risus ultricies tristique nulla. Tincidunt augue interdum velit euismod in pellentesque massa placerat. Aliquam id diam maecenas ultricies mi. Tortor dignissim convallis aenean et tortor at risus viverra. Blandit aliquam etiam erat velit scelerisque in dictum. Mollis aliquam ut porttitor leo a. Mattis enim ut tellus elementum sagittis vitae et leo. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum. Maecenas volutpat blandit aliquam etiam erat velit. Neque egestas congue quisque egestas diam. Feugiat sed lectus vestibulum mattis ullamcorper velit sed. Commodo elit at imperdiet dui accumsan sit amet.`;

export const flexColumn = {
  display: "flex",
  flexDirection: "column",
};

export const centerAligned = {
  justifyContent: "center",
  alignItems: "center",
};

export const directorListItems = [
  {
    text: "Director Home",
    icon: "VideocamIcon",
    route: "/director",
  },
  {
    text: "Verify Crew",
    icon: "GroupIcon",
    route: PATHS.VERIFY_CREW,
  },
  {
    text: "Upload Script",
    icon: "MovieCreationIcon",
    route: "/director/sceneInput",
  },
  {
    text: "Setup",
    icon: "BuildIcon",
    route: "/director/Setup",
  },
  {
    text: "Assign",
    icon: "AssignmentIcon",
    route: PATHS.ASSIGN,
  },
  {
    text: "Schedule Output",
    icon: "ScheduleIcon",
    route: "/director/scheduleOutput",
  },
];
