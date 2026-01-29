import Welcome from "./Welcome";
import Code from "./Code";

export default function ConditionalComponent () {
 const display = true;
 return display ? <Welcome />: <Code />;
}