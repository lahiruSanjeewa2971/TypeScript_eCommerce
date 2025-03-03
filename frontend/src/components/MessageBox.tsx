import Alert from "react-bootstrap/Alert";

type Props = {
  varient?: string;
  children: React.ReactNode;
};

export default function MessageBox({ varient = "info", children }: Props) {
  return <Alert variant={varient || "info"}>{children}</Alert>;
}
