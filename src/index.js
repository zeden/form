import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import {
  Form,
  Table,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  Row,
  Input,
  Col,
  AutoComplete,
  Divider,
  DatePicker,
  Steps,
  PageHeader,
  Descriptions,
  Spin
} from "antd";

import Agents from "./Agents.js";
import "./index.css";
const TicketDestinataires = ["DCOM", "MARSS", "MEDIADOC", "RH", "SABCI", "SST"];

const { TextArea } = Input;
const { Step } = Steps;

const { Option } = Select;
const Loader = <Spin size="large" />;
const dataSource = [
  {
    commentaire: "note",
    statut: "Commande initiée"
  },
  {
    commentaire: "Commentaire",
    statut: "Commande executée"
  },
  {
    commentaire: "note",
    statut: "Commande acceptée"
  },
  {
    commentaire: "note",
    statut: "Commande refusée"
  }
];

const columns = [
  {
    title: "Statut",
    dataIndex: "statut"
  },
  {
    title: "Date",

    dataIndex: "date",
    render: () => (
      <DatePicker
        placeholder="Sélectionnez une date"
        style={{ width: "200px" }}
      />
    )
  },
  {
    title: "commentaire",
    dataIndex: "commentaire"
  }
];
class Demo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  state = {
    selectedItems: [],
    title: "",
    subTitle: "",
    saveLoading: false
  };

  selectMultipleHandleChange = selectedItems => {
    this.setState({ selectedItems });
  };
  render() {
    const { selectedItems } = this.state;
    const _TicketDestinataires = TicketDestinataires.filter(
      o => !selectedItems.includes(o)
    );
    return (
      <div id="page">
        <Form className="segment" onSubmit={this.handleSubmit}>
          <PageHeader
            style={{ padding: "0" }}
            ghost={false}
            onBack={() => window.history.back()}
            title={this.state.title}
            subTitle={this.state.subTitle}
            extra={[
              <Button
                type="primary"
                htmlType="submit"
                // onClick={() => this.setState({ saveLoading: true })}
                loading={this.state.saveLoading}
              >
                Enregistrer
              </Button>
            ]}
          >
            <Descriptions size="small" column={1}>
              <Descriptions.Item colon={false} label="Crée par">
                G.Mignotte
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>

          <Row gutter={[8, 8]} style={{ marginTop: "10px" }}>
            <Col span={8}>
              <Form.Item label="Sélectionnez l'agent concerné" hasFeedback>
                <Select
                  showSearch
                  optionLabelProp="label"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onSelect={(value, option) => {
                    let Agent = Agents.find(Agent => Agent._id === value);
                    this.setState({ title: Agent.name });
                    this.setState({ subTitle: "Agrosup / " + Agent.company });
                  }}
                >
                  {Agents.map(Agent => (
                    <Option value={Agent._id} label={Agent.name}>
                      {Agent.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Préconisé par">
                <Input placeholder="Nom et prénom du médecin" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Quand">
                <DatePicker
                  placeholder="Sélectionnez une date"
                  style={{ width: "200px" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item />
        </Form>
        <Button
          onClick={this.handleAddNew}
          type="primary"
          ghost
          style={{ marginBottom: 16 }}
        >
          Ajouter une demande
        </Button>
        <Form className="segment">
          <Form.Item label="Décrivez votre demande">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item label="Ajouter un ou plusieurs destinataires de tickets">
            <Select
              onChange={this.selectMultipleHandleChange}
              mode="multiple"
              showSearch
              showArrow={true}
            >
              {_TicketDestinataires.map(item => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Actualisez le statut actuel de la demande" >
            <Table
              size="middle"
              rowSelection={{ type: "radio" }}
              dataSource={dataSource}
              columns={columns}
            />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedDemo = Form.create({ name: "validate_other" })(Demo);

ReactDOM.render(<WrappedDemo />, document.getElementById("container"));
