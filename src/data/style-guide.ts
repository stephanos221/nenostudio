/** The sentence most specimens are set in. */
export const sampleSentence = "Sample text is being used as a placeholder for real text that is normally present.";

const sampleShort = "Sample text is being used as a placeholder.";

/** Layout utility shown in the "layout classes" section. */
interface LayoutSpecimen {
  className: string;
  /** Caption, as displayed; defaults to the class name. */
  label?: string;
  /** Id of the caption element. */
  id: string;
  /** The specimen sits inside a neutral box instead of being the box. */
  inBox?: boolean;
}

/** Utilities after the two wrapper specimens, in display order. */
export const layoutSpecimens: readonly LayoutSpecimen[] = [
  { label: "max-width-1col", className: "max-width_1col", id: "node-_65879455-9778-fe26-9134-53f06ad93e36-8255bc03" },
  { label: "max-width-2col", className: "max-width_2col", id: "node-_82132ab3-e942-812a-0e4d-0e318c453aa2-8255bc03" },
  { label: "max-width-3col", className: "max-width_3col", id: "node-a1dce7c5-9aec-20e5-98ac-8d5d9f252903-8255bc03" },
  { label: "max-width-4col", className: "max-width_4col", id: "node-_115d6189-b6d1-bc05-608d-e087d4fd9027-8255bc03" },
  { label: "max-width-5col", className: "max-width_5col", id: "node-_42eb68c4-b5d7-7b53-e218-9454ead551e0-8255bc03" },
  { label: "max-width-6col", className: "max-width_6col", id: "node-_830f2754-c843-98a4-9775-0fabf3b0c83e-8255bc03" },
  { label: "max-width-7col", className: "max-width_7col", id: "node-_2caf7b18-0ee8-9df3-aa60-2a2709cb420c-8255bc03" },
  { className: "max-width-8col", id: "node-f6c0471a-f232-7209-db1f-ecc944c0ea1b-8255bc03" },
  { className: "max-width-9col", id: "node-fc77de08-58b6-eb68-5488-2461415c140f-8255bc03" },
  { className: "max-width-10col", id: "node-_08934a63-c0ac-740c-3b42-53af77c19623-8255bc03" },
  { className: "max-width-11col", id: "node-ab5c3f98-196b-801f-98f8-337b6eb6a08b-8255bc03" },
  { className: "max-width-12col", id: "node-_7c8f5434-1636-241f-bbb9-12b6cde2e761-8255bc03" },
  { className: "max-width-3xsmall", id: "node-_33bcfa3e-cd51-4cc0-a3fd-102c221524b0-8255bc03" },
  { className: "max-width-2xsmall", id: "node-_65879455-9778-fe26-9134-53f06ad93e3b-8255bc03" },
  { className: "max-width-xsmall", id: "node-_65879455-9778-fe26-9134-53f06ad93e40-8255bc03" },
  { className: "max-width-small", id: "node-_65879455-9778-fe26-9134-53f06ad93e45-8255bc03" },
  { className: "max-width-medium", id: "node-_65879455-9778-fe26-9134-53f06ad93e4a-8255bc03" },
  { className: "max-width-semi-large", id: "node-_65879455-9778-fe26-9134-53f06ad93e4f-8255bc03" },
  { className: "max-width-large", id: "node-_65879455-9778-fe26-9134-53f06ad93e54-8255bc03" },
  { className: "max-width-xlarge", id: "node-_65879455-9778-fe26-9134-53f06ad93e59-8255bc03" },
  { className: "max-width-2xlarge", id: "node-_65879455-9778-fe26-9134-53f06ad93e5e-8255bc03" },
  { className: "max-width-3xlarge", id: "node-_65879455-9778-fe26-9134-53f06ad93e63-8255bc03" },
  { className: "max-width-4xlarge", id: "node-_65879455-9778-fe26-9134-53f06ad93e68-8255bc03" },
  { className: "max-width-5xlarge", id: "node-_65879455-9778-fe26-9134-53f06ad93e6d-8255bc03" },
  { className: "max-width-6xlarge", id: "node-_65879455-9778-fe26-9134-53f06ad93e72-8255bc03" },
  { className: "container-max", id: "node-_65879455-9778-fe26-9134-53f06ad93e77-8255bc03" },
  { className: "container-min", id: "node-_65879455-9778-fe26-9134-53f06ad93e7c-8255bc03" },
  { className: "padding-global", id: "node-_65879455-9778-fe26-9134-53f06ad93e81-8255bc03" },
  { className: "padding-section", id: "node-_65879455-9778-fe26-9134-53f06ad93e86-8255bc03", inBox: true },
];

/** The display heading class, which has no matching bare tag. */
export const displayHeadingSpecimen = {
  text: sampleShort,
  /** Id of the specimen's grid item. */
  id: "node-_65879455-9778-fe26-9134-53f06ad93e9b-8255bc03",
};

/** Heading level shown twice: as the bare tag and through its `heading-style-h<level>` class. */
interface HeadingSpecimen {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

export const headingSpecimens: readonly HeadingSpecimen[] = [
  {
    level: 1,
    text: "Sample text helps you understand how real text may look. Sample text is being used as a placeholder.",
  },
  {
    level: 2,
    text: "Sample text is being used as a placeholder. Sample text helps you understand how real text may look.",
  },
  {
    level: 3,
    text: "Sample text helps you understand how real text may look on your website. Sample text is being used as a placeholder for real text that is normally present.",
  },
  {
    level: 4,
    text: "Sample text is being used as a placeholder. Sample text helps you understand how real text may look. Sample text is being used as a placeholder for real text that is normally present.",
  },
  {
    level: 5,
    text: "Sample text is being used as a placeholder. Sample text helps you understand how real text may look. Sample text is being used as a placeholder for real text that is normally present. Sample text helps you understand how real text may look.",
  },
  {
    level: 6,
    text: "Sample text is being used as a placeholder for real text that is normally present. Sample text helps you understand how real text may look. Sample text is being used as a placeholder for real text that is normally present. Sample text helps you understand how real text may look.",
  },
];

/** `text-size-<size>` specimen. */
interface TextSizeSpecimen {
  size: string;
  text: string;
  /** Id of the specimen's grid item. */
  id?: string;
}

export const textSizeSpecimens: readonly TextSizeSpecimen[] = [
  { size: "10xlarge", text: "Sample text.", id: "node-_65879455-9778-fe26-9134-53f06ad93f2b-8255bc03" },
  { size: "9xlarge", text: "Sample text." },
  { size: "8xlarge", text: "Sample text as a placeholder." },
  { size: "7xlarge", text: "Sample text as a placeholder." },
  { size: "6xlarge", text: sampleShort },
  { size: "5xlarge", text: sampleShort },
  { size: "4xlarge", text: sampleShort },
  { size: "3xlarge", text: sampleSentence },
  { size: "2xlarge", text: sampleSentence },
  { size: "xlarge", text: sampleSentence },
  { size: "large", text: sampleSentence },
  { size: "medium", text: sampleSentence },
  { size: "regular", text: sampleSentence },
  { size: "small", text: sampleSentence },
  { size: "xsmall", text: sampleSentence },
  { size: "2xsmall", text: sampleSentence },
  { size: "3xsmall", text: sampleSentence },
  { size: "4xsmall", text: sampleSentence },
];

/** `text-style-<style>` specimen; the text defaults to the class name. */
interface TextStyleSpecimen {
  style: string;
  text?: string;
}

export const textStyleSpecimens: readonly TextStyleSpecimen[] = [
  { style: "strikethrough" },
  { style: "italic" },
  { style: "muted" },
  { style: "allcaps" },
  { style: "nowrap" },
  { style: "link" },
  { style: "quote", text: sampleShort },
  { style: "eyebrow", text: sampleShort },
];

export const textWeights: readonly string[] = ["bold", "semibold", "medium", "normal"];
