import { Alert } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export function ErrorAlert({ title, message }: { title?: string; message: string }) {
  return (
    <Alert.Root status="error" borderRadius="md">
      <WarningIcon style={{ marginRight: 8 }} />
      {title && <Alert.Title mr="2">{title}</Alert.Title>}
      <Alert.Description>{message}</Alert.Description>
    </Alert.Root>
  );
}