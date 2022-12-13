import React from "react";
import ChartistGraph from "react-chartist";
import { useState, Component, useRef, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ControlledSwitches from "../components/Switch.js";
import { useDispatch, useSelector } from "react-redux";
import Chart1 from "components/chart1.js";
import Chart2 from "components/chart2.js";
import Chart3 from "components/chart3.js";
import Chart4 from "components/chart4.js";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
  Dropdown,
  ButtonGroup,
  ToggleButton,
  Pick,
  Alert,
} from "react-bootstrap";

const Report = () => {
  const addList = useSelector((state)=>(state.addReport));
  const dispatch = useDispatch();
  const [power,setPower] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2016-02-01'));
  const [endDate, setEndDate] = useState(new Date('2016-02-01'));
  const [diDay, setDiDay] = useState(0);
  useEffect(()=>{
    loadPower();
    greetData('wPowerChk1');
    greetData('wPowerChk2');
    greetData('deviceUse');
  },[])

  useEffect(() => {
    AddHtml();
  }, [addList]);

  useEffect(()=>{
    greetData('wPowerChk1');
    greetData('wPowerChk2');
    greetData('deviceUse');
  },[endDate])

  const loadPower = ()=>{

    console.log('loadPower function')
    if(power.length == 0){

      axios.post('http://127.0.0.1:3001/db',{
        type:'power'
      })
      .then((res)=>{
          
          console.log('성공');
          dispatch({type:'chart3',chart3_power:res.data.power,chart3_time:res.data.time});
          // setTime(res.data.time);
          // setPower(res.data.power);
          // setMaxPower(res.data.maxVal);
          // console.log(time);
          // console.log(power);
          // console.log(Maxpower);
        
      })
      .catch(()=>{console.log('살패')})
    }
  };

  function greetData(type) {

    let d1 = new Date(endDate);
    let d2 = new Date(startDate);

    console.log((d1.getDate() - d2.getDate())  +'빼기날자');
    let DateData ={
      start : startDate,
      end : endDate,
      diDay : d1.getDate() - d2.getDate()
    }
    axios.post('http://127.0.0.1:3001/total',{
      type:type,
      date:DateData
    })
    .then((res)=>{
        
        console.log('성공');

        if(type=='wPowerChk1'){
          //이번주
          console.log('이번주'+res.data.power);
          dispatch({type:'chart1',chart1_1power:res.data.power,chart1_1label:res.data.label});
          // setthisPower(res.data.power);
          // console.log('이번주'+thisPower);
        } else if (type == "wPowerChk2") {
          dispatch({type:'chart1',chart1_2power:res.data.power,chart1_2label:res.data.label,chart1_diDay:res.data.did});
          console.log('지난주'+res.data.power);
        } else if (type == "deviceUse") {
           dispatch({type:'chart2',chart2_power:res.data.power});
          // console.log('디바이스 사용률'+res.data.power);
        }
      })
      .catch(() => {
        console.log("살패");
      });
  }

  const AddHtml = () => {
    // console.log('addHtml'+addList);
    const arrtext = addList.substr(1).split(",");
    let html = "";
    for (let i = 0; i < arrtext.length; i++) {
      html += arrtext[i];
      // console.log('html'+html);
    }
    return (
      <>
        <tbody dangerouslySetInnerHTML={{ __html: html }}></tbody>
      </>
    );
  };

  const DatePickerComponent = () => {
    let refStartd = useRef();
    let refEndd = useRef();
    let DateData ={
      start : startDate,
      end : endDate
    }

    function dateAxios(){
      axios.post('http://127.0.0.1:3001/db',{
        date:DateData,
        type:'power'
      })
      .then((res)=>{
          console.log('성공');
          // let dt = new Date(endDate);
          // dt = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
          
          // setTime(res.data.time);
          // setPower(res.data.power);
          // setMaxPower(res.data.maxVal);
          // console.log('리덕스파워'+reChart1Power)
          dispatch({type:'chart3',chart3_power:res.data.power,chart3_time:res.data.time});
          // console.log(time);
          // console.log(power);
          // console.log(Maxpower);

          // console.log('리덕스파워'+reChart1Power)
        
      })
      .catch(()=>{console.log('살패')})
    }

    return (
      <>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            name='strDate'
            ref={refStartd}
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            name='endDate'
            ref={refEndd}
            dateFormat="yyyy-MM-dd"
          />
          <Button
            className="btn-fill pull-right"
            type="button"
            variant="info"
            style={{
              lineHeight:1.2
            }}
            onClick={()=>dateAxios()}
          >
            조회
          </Button>
          <Button
            className="btn-fill pull-right ml-3"
            type="button"
            variant="info"
            style={{
              lineHeight:1.2,
              background:'#FFBB00'
            }}
            onClick={()=>alert('준비중입니다.')}
          >
            전체 리포트 다운
          </Button>
      </>
    );
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="7">
            <Card>
              <Card.Header>
                <Card.Title as="h4">전력 총 사용량</Card.Title>
                <p className="card-category">24 Hours performance</p>
                <DatePickerComponent />
              </Card.Header>
              <Card.Body>
                <Chart3/>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="5">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">전력 총 사용량 주요 리포트</Card.Title>
                <p className="card-category">Backend development</p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          1.
                        </td>
                        <td colSpan={2}>
                          Sign contract for "What are conference organizersafraid of?"
                        </td>
                      </tr>
                      <tr>
                        <td>
                          2.
                        </td>
                        <td colSpan={2}>
                          Lines From Great Russian Literature? Or E-mails From
                          My Boss?
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">디바이스별 전력 사용률</Card.Title>
                  <p className="card-category">Last Campaign Performance</p>
                </Card.Header>
                <Card.Body>
                  <Chart2/>
                </Card.Body>
              </Card>
            </Col>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">과거 전력 사용량 비교</Card.Title>
                  <p className="card-category">Last Campaign Performance</p>
                </Card.Header>
                <Card.Body className="all-icons">
                  <Row>
                    <Col className="font-icon-list" lg="12" md="12" sm="12" xs="12">
                      <Chart1/>
                    </Col>
                  
                  </Row>

                </Card.Body>
              </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">디바이스별 전력사용률 주요 리포트</Card.Title>
                <p className="card-category">Backend development</p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          1.
                        </td>
                        <td colSpan={2}>
                          Sign contract for "What are conference organizers
                          afraid of?"
                        </td>
                      </tr>
                      <tr>
                        <td>
                          2.
                        </td>
                        <td colSpan={2}>
                          Lines From Great Russian Literature? Or E-mails From
                          My Boss?
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">과거 전력 사용량 비교 주요 리포트</Card.Title>
                <p className="card-category">Backend development</p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          1.
                        </td>
                        <td colSpan={2}>
                          Sign contract for "What are conference organizers
                          afraid of?"
                        </td>
                      </tr>
                      <tr>
                        <td>
                          2.
                        </td>
                        <td colSpan={2}>
                          Lines From Great Russian Literature? Or E-mails From
                          My Boss?
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">다음달 전력 사용량 예측 </Card.Title>
                <p className="card-category">All products including Taxes</p>
              </Card.Header>
              <Card.Body>
                <Chart4/>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">다음달 전력 사용량 예측 주요 리포트</Card.Title>
                <p className="card-category">Backend development</p>
              </Card.Header>
              <Card.Body>
              <div className="table-full-width">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          1.
                        </td>
                        <td colSpan={2}>
                          Sign contract for "What are conference organizers
                          afraid of?"
                        </td>
                      </tr>
                      <tr>
                        <td>
                          2.
                        </td>
                        <td colSpan={2}>
                          Lines From Great Russian Literature? Or E-mails From
                          My Boss?
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Report;
