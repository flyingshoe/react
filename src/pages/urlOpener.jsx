import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Tooltip,
  ClickAwayListener,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function UrlOpener() {
  const [links, setLinks] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  // Load links from URL on mount
  useEffect(() => {
    const parameters = window.location.href.split(/\?(.+)/)[1];
    if (parameters) {
      const decoded = parameters
        .split(";")
        .map((x) => decodeURIComponent(x))
        .join("\n");
      setLinks(decoded + "\n");

      // Remove parameters from URL
      const baseUrl = new URL(window.location.href);
      window.history.replaceState(
        null,
        "",
        `${baseUrl.origin}${baseUrl.pathname}`
      );
    }
  }, []);

  useEffect(() => {
    saveLinks();
  }, [links]);

  const saveLinks = () => {
    const baseUrl = new URL(window.location.href);
    const lines = links
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    if (lines.length === 0) return;

    const queryString = lines
      .map((line) => encodeURIComponent(line))
      .map((line, i) => (i === 0 ? `?${line}` : `;${line}`))
      .join("");

    const newUrl = `${baseUrl.origin}${baseUrl.pathname}${queryString}`;
    setShareUrl(newUrl);
  };

  const openLinks = () => {
    const linkArr = links
      .split("\n")
      .map((x) => x.trim())
      .filter((x) => x !== "");

    if (window.confirm(`Open ${linkArr.length} links?`)) {
      linkArr.forEach((link, i) => {
        setTimeout(() => window.open(link, "_blank"), i * 300);
      });
    }
  };

  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const copyUrl = () => {
    handleTooltipOpen();
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <TextField
        multiline
        fullWidth
        minRows={15}
        value={links}
        onChange={(e) => setLinks(e.target.value)}
        placeholder="Paste links here!"
        sx={{ mt: 3 }}
      />

      <Box className="flex mt-4 gap-4">
        <div className="flex grow ">
          <TextField
            value={shareUrl}
            label="Share URL"
            disabled
            className="w-full"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            }}
          />
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              title="URL copied to clipboard!"
              placement="top"
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <Button
                variant="contained"
                onClick={copyUrl}
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                <ContentCopyIcon />
              </Button>
            </Tooltip>
          </ClickAwayListener>
        </div>

        <Button
          variant="contained"
          onClick={openLinks}
          sx={{
            background: "linear-gradient( 120deg, #bd34fe, #47caff )",
          }}
        >
          Open URLS
        </Button>
      </Box>
    </Container>
  );
}
