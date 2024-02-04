import { StringMessage } from "./StringMessage";

export type Step = {
  Step: {
    Name: "PlayerStep" | "Step" | "DamageStep";
    MessageData: "<PlayerStep><Probability>100.0</Probability><PlayerId>2</PlayerId><TargetId>-1</TargetId><StepType>0</StepType><CellTo><Y>14</Y><X>4</X></CellTo><State>3</State><CellFrom><Y>9</Y><X>3</X></CellFrom><Skill>0</Skill></PlayerStep>";
  };
  Results: {
    StringMessage: StringMessage[];
  };
};
