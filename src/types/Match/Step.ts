import { StringMessage } from "../messageData/StringMessage";

export type Step = {
  Step: {
    Name: "PlayerStep" | "Step" | "DamageStep";
    MessageData: string; // xml string
  };
  Results: {
    StringMessage: StringMessage[];
  };
};
