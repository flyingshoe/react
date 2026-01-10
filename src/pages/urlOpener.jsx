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
    const url = new URL(window.location.href);
    const parameters = url.searchParams.getAll("urlOpener");

    if (parameters.length > 0) {
      setLinks(parameters.join("\n"));

      // Remove parameters from URL
      url.search = "";

      window.history.replaceState(null, "", url);
    }
  }, []);

  useEffect(() => {
    saveLinks();
  }, [links]);

  const saveLinks = () => {
    const newUrl = new URL(window.location.href);

    links.split("\n").forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine != "") {
        newUrl.searchParams.append("urlOpener", trimmedLine);
      }
    });

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
              "& .MuiOutlinedInput-root": {
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
