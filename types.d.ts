type JsonString = string;

type TrpcEvent = {
  procedureName: string;
  data: JsonString;
};

interface Window {
  electron: {
    sendTrpcEvent: (payload: TrpcEvent) => Promise<any>;
  };
}
