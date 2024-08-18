type ExamplePayload = {
  message: string;
};

type EventPayloadMapping = {
  exampleChanged: ExamplePayload;
  requestExample: ExamplePayload;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeExample: (
      callback: (example: ExamplePayload) => void
    ) => UnsubscribeFunction;
    getExample: () => Promise<ExamplePayload>;
  };
}
