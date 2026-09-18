// // --- Core UI Components ---
// import Button from "./Button.jsx";
// import Input from "./Input.jsx";
// import Select from "./Select.jsx";
// import CustomSection from "./CustomSection.jsx";
// import HeroSection from "./HeroSection.jsx";
// import SkillsSection from "./SkillsSection.jsx";
// import ProjectCard from "./ProjectCard.jsx";
// import ProjectGrid from "./ProjectGrid.jsx";
// import ResumePreview from "./ResumePreview.jsx";
// import ServerWakeupBanner from "./ServerWakeupBanner.jsx";
// import AiPromptModal from "./AiPromptModal.jsx";

// // --- Layout Components ---
// import Container from "./container/Container.jsx";
// import Header from "./Header/Header.jsx";
// import AdminHeader from "./Header/AdminHeader.jsx";
// import PublicHeader from "./Header/PublicHeader.jsx";
// import LogoutBtn from "./Header/LogoutBtn.jsx";
// import Footer from "./footer/Footer.jsx";

// // --- Master Canvas Nodes (from /nodes) ---
// import ShapeNode from "./nodes/ShapeNode.jsx";
// import TableNode from "./nodes/TableNode.jsx";
// import TextNode from "./nodes/TextNode.jsx";
// import IconNode from "./nodes/IconNode.jsx";
// import InteractiveNode from "./nodes/InteractiveNode.jsx";

// // --- Master Canvas Edges (from /edges) ---
// import OrthogonalEdge from "./edges/OrthogonalEdge.jsx";
// import StraightEdge from "./edges/StraightEdge.jsx";


// // Node dictionary matching the Master Rulebook
// export const customNodeTypes = {
//   node_shape: ShapeNode,
//   node_table: TableNode,
//   node_text: TextNode,
//   node_icon: IconNode,
//   node_interactive: InteractiveNode,

// };

// // Edge dictionary
// export const customEdgeTypes = {
//   edge_orthogonal: OrthogonalEdge,
//   edge_straight: StraightEdge,
// };

// export {
//   Button,
//   Input,
//   Select,
//   CustomSection,
//   HeroSection,
//   SkillsSection,
//   ProjectCard,
//   ProjectGrid,
//   ResumePreview,
//   ServerWakeupBanner,
//   AiPromptModal,
//   Container,
//   Header,
//   AdminHeader,
//   PublicHeader,
//   LogoutBtn,
//   Footer,
//   ShapeNode,
//   TableNode,
//   TextNode,
//   IconNode,
//   InteractiveNode,
//   OrthogonalEdge,
//   StraightEdge,

// };


// --- 1. Global UI Arsenal (Single Source of Truth) ---
import ElectricButton from "./ui/ElectricButton.jsx";
import GlassInput from "./ui/GlassInput.jsx";
import GlassSelect from "./ui/GlassSelect.jsx";
import GlassCard from "./ui/GlassCard.jsx";
import SkeletonLoader from "./ui/SkeletonLoader.jsx";

// --- 2. Feature Components ---
import ServerWakeupBanner from "./ServerWakeupBanner.jsx";
import AiPromptModal from "./AiPromptModal.jsx";
import InteractiveAiDemo from "./landing/InteractiveAiDemo.jsx";
import WorkspaceCard from "./dashboard/WorkspaceCard.jsx";

// --- 3. Layout Components ---
import Container from "./container/Container.jsx";
import Header from "./Header/Header.jsx";
import AdminHeader from "./Header/AdminHeader.jsx";
import PublicHeader from "./Header/PublicHeader.jsx";
import LogoutBtn from "./Header/LogoutBtn.jsx";
import Footer from "./footer/Footer.jsx";

// --- 4. Master Canvas Nodes (DO NOT TOUCH) ---
import ShapeNode from "./nodes/ShapeNode.jsx";
import TableNode from "./nodes/TableNode.jsx";
import TextNode from "./nodes/TextNode.jsx";
import IconNode from "./nodes/IconNode.jsx";
import InteractiveNode from "./nodes/InteractiveNode.jsx";

// --- 5. Master Canvas Edges (DO NOT TOUCH) ---
import OrthogonalEdge from "./edges/OrthogonalEdge.jsx";
import StraightEdge from "./edges/StraightEdge.jsx";

// Canvas Dictionary
export const customNodeTypes = {
  node_shape: ShapeNode,
  node_table: TableNode,
  node_text: TextNode,
  node_icon: IconNode,
  node_interactive: InteractiveNode,
};

// Edge Dictionary
export const customEdgeTypes = {
  edge_orthogonal: OrthogonalEdge,
  edge_straight: StraightEdge,
};

// Centralized Exports
export {
  ElectricButton,
  GlassInput,
  GlassSelect,
  GlassCard,
  SkeletonLoader,
  ServerWakeupBanner,
  AiPromptModal,
  InteractiveAiDemo,
  WorkspaceCard,
  Container,
  Header,
  AdminHeader,
  PublicHeader,
  LogoutBtn,
  Footer,
  ShapeNode,
  TableNode,
  TextNode,
  IconNode,
  InteractiveNode,
  OrthogonalEdge,
  StraightEdge,
};