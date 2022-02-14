import React, { Fragment, useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Card,
  CardContent,
  Pagination,
  Backdrop,
  Modal,
  Fade,
} from "@mui/material";

import Header from "components/Header";

import Player from "api";
import { PlayerInterface } from "interfaces";

import styles from "styles/Home.module.css";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const Home: NextPage = () => {
  const [players, setPlayers] = useState<PlayerInterface[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerInterface | null>(
    null
  );
  const [pages, setPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string | undefined>(undefined);
  const [order, setOrder] = useState<string | undefined>(undefined);
  const [byClub, setByClub] = useState<boolean>(false);
  const [showInputSearchByClub, setShowInputSearchByClub] =
    useState<boolean>(false);
  const [showInputName, setShowInputName] = useState<boolean>(false);
  const [club, setClub] = useState<string>("");

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleClickDetails = (player: PlayerInterface) => {
    setShowModal(true);
    setSelectedPlayer(player);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlayer(null);
  };

  const searchByClub = async () => {
    setByClub(true);
    const response = await Player.searchByClub({ page, name: club });
    setPlayers(response.players);
    setPages(response.totalPages);
    setPage(response.page);
  };

  const closeSearchClubInput = () => {
    setByClub(false);
    setShowInputSearchByClub(false);
    setClub("");
  };

  const closeSearchNameInput = () => {
    setShowInputName(false);
    setSearchName(undefined);
    setOrder(undefined);
  };

  const getPlayers = useCallback(async () => {
    if (!byClub) {
      const response = await Player.getPlayers(searchName, page, order);
      setPlayers(response.players);
      setPages(response.totalPages);
      setPage(response.page);
      return;
    }
    if (club !== "") {
      const response = await Player.searchByClub({ page, name: club });
      setPlayers(response.players);
      setPages(response.totalPages);
      setPage(response.page);
    }
  }, [
    setPlayers,
    setPages,
    setPage,
    searchName,
    page,
    order,
    showInputSearchByClub,
    byClub,
  ]);

  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  return (
    <Fragment>
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <Box sx={style}>
            <div className={styles.content_details}>
              <div className={styles.details}>
                <Typography className={styles.title_desc}>Name:</Typography>
                <Typography className={styles.text_desc}>
                  {selectedPlayer?.name}
                </Typography>
              </div>
              <div className={styles.details}>
                <Typography className={styles.title_desc}>
                  Nationality:
                </Typography>
                <Typography className={styles.text_desc}>
                  {selectedPlayer?.nationality}
                </Typography>
              </div>
              <div className={styles.details}>
                <Typography className={styles.title_desc}>Position:</Typography>
                <Typography className={styles.text_desc}>
                  {selectedPlayer?.position}
                </Typography>
              </div>
              <div className={styles.details}>
                <Typography className={styles.title_desc}>Club:</Typography>
                <Typography className={styles.text_desc}>
                  {selectedPlayer?.club}
                </Typography>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FIFA API
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Typography className={styles.title} variant="h5">
        Players
      </Typography>
      <Header
        setClub={setClub}
        setShowInputSearchByClub={setShowInputSearchByClub}
        showInputSearchByClub={showInputSearchByClub}
        searchByClub={searchByClub}
        club={club}
        closeSearchClubInput={closeSearchClubInput}
        setName={setSearchName}
        name={searchName}
        showInputName={showInputName}
        setShowInputName={setShowInputName}
        closeSearchNameInput={closeSearchNameInput}
        order={order}
        setOrder={setOrder}
      />
      <div className={styles.container}>
        {players.length > 0 &&
          players.map((player) => {
            return (
              <Card
                className={styles.card_player}
                key={player._id}
                onClick={() => handleClickDetails(player)}
              >
                <CardContent className={styles.content_card}>
                  <img
                    src="https://rrhh.grandvalira.com/sites/default/files/content-block-isotips/default-welcomer.png"
                    alt="player"
                    className={styles.img_player}
                  />
                  <Typography className={styles.name_player}>
                    {player.name}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
      </div>
      <div className={styles.pagination_content}>
        <Pagination
          key={page}
          count={pages}
          defaultPage={page}
          color="primary"
          showFirstButton
          showLastButton
          onChange={handleChangePage}
        />
      </div>
    </Fragment>
  );
};

export default Home;
