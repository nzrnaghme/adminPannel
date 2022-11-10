import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { getItem } from "api/storage/storage";
import { getEmployeeById } from "api/Core/Employe_Manage";
import { updateEmployeeById } from "api/Core/Employe_Manage";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const userId = getItem('id')
  const [dataUser, setDataUser] = useState()
  const [topics, setTopics] = useState([])
  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [birth, setBirth] = useState()
  const [address, setAddress] = useState()
  const [email, setEmail] = useState()

  useEffect(() => {
    getDataUser()
  }, [])

  const getDataUser = async () => {
    let response = await getEmployeeById(userId);
    if (response.data.result) {
      setDataUser(response.data.result)
      const topic = response.data.result.courses.map((item) => (
        { topic: item.lesson.topics[0] }
      ))
      setTopics(topic)
      setName(response.data.result.fullName)
      setPhone(response.data.result.phoneNumber)
      setBirth(response.data.result.birthDate)
      setAddress(response.data.result.address)
      setEmail(response.data.result.email)
    }
  }

  const updateUser = async () => {
    const data = {
      id: userId,
      fullName: name,
      email,
      birthDate: birth,
      phoneNumber: phone,
      address,
      nationalId: dataUser.nationalId,
      profile: dataUser.profile
    }
    await updateEmployeeById(data)
  }

  return (
    <div>
      {dataUser && topics &&
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}> پروفایل</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      rtlActive
                      labelText="نام"
                      value={name}
                      onChange={(e) => { setName(e) }}
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />

                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      rtlActive
                      labelText="کد ملی"
                      id="company-disabled"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                      value={dataUser.nationalId}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      rtlActive
                      labelText="ایمیل"
                      id="email-address"
                      value={email}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onChange={(e) => { setEmail(e) }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      rtlActive
                      labelText="موبایل"
                      id="phone"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={phone}
                      onChange={(e) => { setPhone(e) }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="آدرس"
                      id="address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={address}
                      rtlActive
                      onChange={(e) => { setAddress(e) }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="تاریخ تولد"
                      id="birth"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={birth}
                      onChange={(e) => { setBirth(e) }}
                      rtlActive
                    />
                  </GridItem>

                </GridContainer>

              </CardBody>
              <CardFooter>
                <Button color="info" onClick={() => { updateUser() }}>بروزرسانی</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={dataUser.profile} alt="..." />
                </a>

              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>{dataUser.role}</h6>
                {topics.map((item, key) => (
                  <p className={classes.description} key={key}>
                    {item.topic}

                  </p>
                ))}
                {/* <Button color="primary" round>
                  تغییر عکس
                </Button> */}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>}
    </div>
  );
}
