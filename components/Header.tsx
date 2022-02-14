import React from "react";
import { Button, TextField, IconButton, MenuItem } from "@mui/material";
import { Search, Close } from "@mui/icons-material";

const Header = ({
  setShowInputSearchByClub,
  setClub,
  showInputSearchByClub,
  searchByClub,
  club,
  closeSearchClubInput,
  setName,
  name,
  showInputName,
  setShowInputName,
  closeSearchNameInput,
  order,
  setOrder,
}: {
  setShowInputSearchByClub: (is: boolean) => unknown;
  setClub: (club: string) => unknown;
  showInputSearchByClub: boolean;
  searchByClub: () => unknown;
  club: string;
  closeSearchClubInput: () => unknown;
  setName: (name: string) => unknown;
  name: string | undefined;
  showInputName: boolean;
  setShowInputName: (is: boolean) => unknown;
  closeSearchNameInput: () => unknown;
  order: undefined | string;
  setOrder: (value: string) => unknown;
}) => {
  return (
    <div className="container_header">
      <div className="content_header_club">
        <div
          className="content_input"
          style={{
            width: showInputSearchByClub ? "100%" : "0%",
            opacity: showInputSearchByClub ? 1 : 0,
            pointerEvents: showInputSearchByClub ? "auto" : "none",
            transition: "width .5s ease",
          }}
        >
          <TextField
            label="Club"
            color="secondary"
            autoComplete="off"
            type={"text"}
            className="input"
            onChange={(e) => setClub(e.target.value)}
            value={club}
          />
          <IconButton color="secondary" onClick={searchByClub}>
            <Search />
          </IconButton>
          <IconButton color="primary" onClick={closeSearchClubInput}>
            <Close />
          </IconButton>
        </div>
        <Button
          variant="contained"
          color="secondary"
          className="btn"
          onClick={() => {
            setShowInputSearchByClub(true);
            closeSearchNameInput();
          }}
          style={{
            opacity: showInputSearchByClub ? 0 : 1,
            pointerEvents: showInputSearchByClub ? "none" : "auto",
            transition: "all .3s ease",
          }}
          disabled={name !== undefined}
        >
          Search by club
        </Button>
      </div>
      <div className="content_header_name">
        <div
          className="content_input"
          style={{
            width: showInputName ? "100%" : "0%",
            opacity: showInputName ? 1 : 0,
            pointerEvents: showInputName ? "auto" : "none",
            transition: "width .5s ease",
          }}
        >
          <TextField
            label="Name"
            color="secondary"
            autoComplete="off"
            type={"text"}
            className="input"
            onChange={(e) => setName(e.target.value)}
            value={name ? name : ""}
          />
          <TextField
            select
            label="Order"
            value={order ? order : ""}
            color="secondary"
            onChange={(e) => setOrder(e.target.value)}
            className="input"
          >
            <MenuItem value="asc">Asc</MenuItem>
            <MenuItem value="desc">Desc</MenuItem>
          </TextField>
          <IconButton color="primary" onClick={closeSearchNameInput}>
            <Close />
          </IconButton>
        </div>
        <Button
          variant="contained"
          color="secondary"
          disabled={club !== ""}
          className="btn"
          onClick={() => {
            setShowInputName(true);
            closeSearchClubInput();
          }}
          style={{
            opacity: showInputName ? 0 : 1,
            pointerEvents: showInputName ? "none" : "auto",
            transition: "all .3s ease",
          }}
        >
          Search by name
        </Button>
      </div>
    </div>
  );
};

export default Header;
