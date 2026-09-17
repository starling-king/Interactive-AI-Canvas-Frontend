// --- Core UI Components ---
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Select from "./Select.jsx";
import CustomSection from "./CustomSection.jsx";
import HeroSection from "./HeroSection.jsx";
import SkillsSection from "./SkillsSection.jsx";
import ProjectCard from "./ProjectCard.jsx";
import ProjectGrid from "./ProjectGrid.jsx";
import ResumePreview from "./ResumePreview.jsx";
import ServerWakeupBanner from "./ServerWakeupBanner.jsx";
import AiPromptModal from "./AiPromptModal.jsx";

// --- Layout Components ---
import Container from "./container/Container.jsx";
import Header from "./Header/Header.jsx";
import AdminHeader from "./Header/AdminHeader.jsx";
import PublicHeader from "./Header/PublicHeader.jsx";
import LogoutBtn from "./Header/LogoutBtn.jsx";
import Footer from "./footer/Footer.jsx";

// --- Master Canvas Nodes (from /nodes) ---
import ShapeNode from "./nodes/ShapeNode.jsx";
import TableNode from "./nodes/TableNode.jsx";
import TextNode from "./nodes/TextNode.jsx";
import IconNode from "./nodes/IconNode.jsx";
import InteractiveNode from "./nodes/InteractiveNode.jsx";

// --- Master Canvas Edges (from /edges) ---
import OrthogonalEdge from "./edges/OrthogonalEdge.jsx";
import StraightEdge from "./edges/StraightEdge.jsx";

// --- Fallback / Legacy Nodes (located directly in /components) ---
// import InputNode from "./InputNode.jsx";
// import OutputNode from "./OutputNode.jsx";
// import ProcessCardNode from "./ProcessCardNode.jsx";
// import DecisionGateNode from "./DecisionGateNode.jsx";

// Node dictionary matching the Master Rulebook
export const customNodeTypes = {
  node_shape: ShapeNode,
  node_table: TableNode,
  node_text: TextNode,
  node_icon: IconNode,
  node_interactive: InteractiveNode,

};

// Edge dictionary
export const customEdgeTypes = {
  edge_orthogonal: OrthogonalEdge,
  edge_straight: StraightEdge,
};

export {
  Button,
  Input,
  Select,
  CustomSection,
  HeroSection,
  SkillsSection,
  ProjectCard,
  ProjectGrid,
  ResumePreview,
  ServerWakeupBanner,
  AiPromptModal,
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