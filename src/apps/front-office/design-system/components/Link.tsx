import { Anchor, AnchorProps } from "@mantine/core";
import { Link, LinkProps } from "@mongez/react-router";

export function UnStyledLink(
  props: Omit<AnchorProps, "component"> & LinkProps,
) {
  return <Anchor {...props} unstyled component={Link} />;
}
