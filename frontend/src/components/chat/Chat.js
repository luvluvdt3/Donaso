import React, { Component } from 'react'
import PerfectScrollbar from 'perfect-scrollbar';
import axios from 'axios'
import AppURL from '../../api/AppURL';
import moment from 'moment';
import { Redirect, Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      messages: [],
      products: [],
      chatters: [],
      currentChatter: [],
      currentProduct: [],
      currentMessage: [],
      currentIndex: 0,
      inputMessage: ""
    }
  }
  componentDidMount() {
    new PerfectScrollbar('.chat-list');
    new PerfectScrollbar('.chat-content');
    this.setState({ user: this.props.user })
    axios.get(AppURL.MessagesByUser(this.props.user.id)).then(response => {
      let messagesSaved = [];
      let res = response.data;
      // console.log(res)
      while (res.length > 0) {
        //console.log(res[0].content)
        if (res[0].receiverId == this.state.user.id) {  //if the receiver is current user -> gets all the messages with the same person and the same product -> store in var messages
          let toSave = res.filter((item) => (item.receiverId == res[0].senderId || item.senderId == res[0].senderId) && item.productId == res[0].productId)
          messagesSaved.push(toSave)
          res = res.filter((item) => !((item.receiverId == res[0].senderId || item.senderId == res[0].senderId) && item.productId == res[0].productId)) //only keeps messages between different users or not the same product
        }
        else if (res[0].senderId == this.state.user.id) {
          let toSave = res.filter((item) => (item.receiverId == res[0].receiverId || item.senderId == res[0].receiverId) && item.productId == res[0].productId);
          messagesSaved.push(toSave)
          res = res.filter((item) => !((item.receiverId == res[0].receiverId || item.senderId == res[0].receiverId) && item.productId == res[0].productId))
        }
      }
      messagesSaved.map((message, i) => {
        axios.get(AppURL.ProductById(message[0].productId)).then(response => {
          var joined = this.state.products.concat(response.data[0])
          this.setState({
            currentProduct: joined[0],
            products: joined,
          })
          console.log("products")
          console.log(joined[0])
          console.log(joined)
        }).catch(error => { });
        if (message[0].senderId == this.state.user.id) {
          axios.get(AppURL.UserById(message[0].receiverId)).then(response => {
            var joined = this.state.chatters.concat(response.data[0])
            this.setState({
              currentChatter: joined[0],
              chatters: joined,
            })
          }).catch(error => { });
        }
        else {
          axios.get(AppURL.UserById(message[0].senderId)).then(response => {
            var joined = this.state.chatters.concat(response.data[0])
            this.setState({
              chatters: joined,
              currentChatter: joined[0]
            })
            // console.log(joined)
          }).catch(error => { });
        }
      })
      // console.log("FINAL")
      // console.log(messagesSaved)
      this.setState({
        messages: messagesSaved,
        currentMessage: messagesSaved[0],
      });
      // console.log(this.state.messages)

    }).catch(error => {

    });
  }
  btnReserved = (idCreator, reservedId, chatterId) => {
    if (chatterId == undefined || idCreator != this.state.user.id || this.state.user.id == undefined || idCreator == undefined) {//not loaded or not your product
      return (<></>)
    }
    else {
      if (reservedId != chatterId && reservedId != null) {
        return (
          <button className='btn btn-warning' disabled>
            Product Reserved To Another Person
          </button>
        )
      }
      else if (reservedId == chatterId) {
        return (
          <button className='btn btn-danger' >
            Unreserve Product To This Person
          </button>
        )
      }
      else {  //reservedTo=null
        return (
          <button className='btn btn-primary' >
            Reserve To This Person
          </button>
        )

      }
    }
  }

  MessagesDisplay = (content, senderIdOrNot, date) => {
    if (senderIdOrNot == true) {
      return (
        <div class="chat-content-rightside" >
          <div class="d-flex ms-auto">
            <div class="flex-grow-1 me-2">
              <p class="mb-0 chat-time text-end">You, {moment.utc(date).local().startOf('seconds').fromNow()}</p>
              <p class="chat-right-msg" onClick={() => { console.log(this.state.currentMessage) }}>{content}</p>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div class="chat-content-leftside">
          <div class="d-flex">
            <img src={this.state.currentChatter.profile_photo_path} width="48" height="48" class="rounded-circle" alt="" />
            <div class="flex-grow-1 ms-2">
              <p class="mb-0 chat-time">{this.state.currentChatter.name}, {moment.utc(date).local().startOf('seconds').fromNow()}</p>
              <p class="chat-left-msg">{content}</p>
            </div>
          </div>
        </div>
      )
    }
  }
  LeftOption = (count, content, sender, receiver, date) => {
    let productImage = "";
    let productName = "";
    let chatterAvatar = "";
    let chatterName = "";
    if (this.state.products[count] != undefined) {
      productImage = this.state.products[count].image;
      productName = this.state.products[count].product_name;
    }
    if (this.state.chatters[count] != undefined) {
      chatterAvatar = this.state.chatters[count].profile_photo_path;
      chatterName = this.state.chatters[count].name;
    }
    let active = ""
    if (this.state.currentIndex == count) {
      active = "activee";
    }
    if (this.state.messages != undefined && this.state.currentChatter != undefined && this.state.currentMessage != undefined && this.state.currentProduct != undefined && this.state.products != undefined) {
      return (
        <div onClick={() => {
          this.setState({
            currentChatter: this.state.chatters[count], 
            currentProduct: this.state.products[count], 
            currentMessage: this.state.messages[count], 
            currentIndex: count
          })
        }} className="chatWrapper p-1 m-1" >
          <div href="javascript:;" class="list-group-item" className={active} value={count} onClick={this.messageClicked} >
            <div class="d-flex" >
              <div class="chat-user-online">
                <img src={chatterAvatar} width="42" height="42" class="rounded-circle" alt="" />
              </div>
              <div class="flex-grow-1 ms-2">
                <h6 class="mb-0 chat-title">{chatterName}</h6>
                <h6 class="mb-0" style={{ color: "blue" }}>{productName}</h6>
                <p class="mb-0 chat-msg">{content}</p>
              </div>
              <div class="chat-time">{moment.utc(date).local().startOf('seconds').fromNow()}</div>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <></>
      )
    }

  }
  inputMessageOnChange = (e => {
    this.setState({ inputMessage: e.target.value })
  })
  sendMessage = (e) => {
    e.preventDefault();
    let senderId = this.state.user.id;
    let receiverId = this.state.currentChatter.id;
    let content = this.state.inputMessage;
    let productId = this.state.currentProduct.id;
    if (content.length == 0) {
      cogoToast.error("Your message is empty", { position: 'top-right' });
    }
    else {
      let MyFormData = new FormData();
      MyFormData.append('senderId', senderId)
      MyFormData.append('receiverId', receiverId)
      MyFormData.append('content', content)
      MyFormData.append('productId', productId)
      axios.post(AppURL.PostMessage, MyFormData).then(response => {
        if (Number.isInteger(response.data)) { //normally should check if it's ===1 but we kinda return the message's id here
        }
        else {
          cogoToast.error("Your Request is not done ! Try Again", { position: 'top-right' });
        }
      }).catch(error => {
        // cogoToast.error("Your Request is not done ! Try Again", { position: 'top-right' });
      });
    }
  }
  render() {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/login" />
    }

    return (
      <div class="page-content">
        <div class="chat-wrapper">
          <div class="chat-sidebar">
            <div class="chat-sidebar-header">
              <div class="d-flex align-items-center">
                <div class="chat-user-online">
                  <img src={this.state.user.profile_photo_path} width="45" height="45" class="rounded-circle" alt="" />
                </div>
                <div class="flex-grow-1 ms-2">
                  <p class="mb-0">{this.state.user.name}</p>
                </div>
              </div>
              <div class="input-group input-group-sm"> <span class="input-group-text bg-transparent"><i class='fa fa-search'></i></span>
                <input type="text" class="form-control" placeholder="People, groups, & messages" />
              </div>
            </div>
            <div class="chat-sidebar-content">
              <div class="tab-content" id="pills-tabContent">
                <div class="chat-list">
                  <div class="list-group list-group-flush">
                    <div>
                      {this.state.messages.map((message, i) => (
                        <div>
                          {this.LeftOption(i, message[message.length - 1].content, message[message.length - 1].senderId, message[message.length - 1].receiverId, message[message.length - 1].date)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="chat-header d-flex align-items-center">
            <div class="chat-toggle-btn"><i class='bx bx-menu-alt-left'></i>
            </div>
            <div>
              {this.state.messages != undefined && this.state.currentChatter != undefined && this.state.currentMessage != undefined && this.state.currentProduct != undefined
                ? <div>  <Link to={"/user/" + this.state.currentChatter.id} class="mb-1 font-weight-bold" onClick={() => { console.log(this.state.currentProduct.reservedTo) }}><h4>{this.state.currentChatter.name}</h4></Link>
                  <div class="list-inline d-sm-flex mb-0 d-none">
                    <small class='bx bxs-circle me-1 chart-online'></small>
                    <Link to={"/productdetails/" + this.state.currentProduct.id} href="javascript:;" class="list-inline-item d-flex align-items-center text-secondary">{this.state.currentProduct.product_name}</Link>
                  </div></div>
                : <div></div>
              }

            </div>
            <div class="chat-top-header-menu ms-auto">
              {this.btnReserved(this.state.currentProduct.idCreator, this.state.currentProduct.reservedTo, this.state.currentChatter.id)}
            </div>
          </div>
          <div class="chat-content">
            {/* To prevent reading .map of undefined */}
            {this.state.currentMessage != undefined
              ? <div>
                {this.state.currentMessage.map((message, i) => (
                  <div>
                    {/* wow it WORKEDDDD It freaking WORKED well or else it will just have that nasty problem of making one side messages */}

                    {message.senderId == this.state.user.id
                      ? <div> {this.MessagesDisplay(message.content, true, message.date)}</div>
                      : <div>{this.MessagesDisplay(message.content, false, message.date)}</div>
                    }

                  </div>
                ))}
              </div>
              : <div></div>
            }

          </div>

          <div class="chat-footer d-flex align-items-center">
            <div class="flex-grow-1 pe-2">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Type a message" onChange={this.inputMessageOnChange} />
              </div>
            </div>
            <div class="chat-footer-menu">
              <button className="btn btn-primary" onClick={this.sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default Chat