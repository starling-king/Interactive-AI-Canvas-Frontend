import InputNode from "./nodes/InputNode.jsx";
import ProcessCardNode from "./nodes/ProcessCardNode.jsx";
import DecisionGateNode from "./nodes/DecisionGateNode.jsx";
import OutputNode from "./nodes/OutputNode.jsx";

export const customNodeTypes = {
  'input_metric': InputNode,
  'process_math': ProcessCardNode,
  'decision_gate': DecisionGateNode,
  'output_alert': OutputNode
};
export {
  InputNode,
  ProcessCardNode,
  DecisionGateNode,
  OutputNode
};
