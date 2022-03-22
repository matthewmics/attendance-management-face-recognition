// import React, { Fragment } from "react";

// import { Dropdown, Icon, Menu, Label, Modal, Button } from "semantic-ui-react";
// import { NavLink, Redirect, Route, Switch } from "react-router-dom";
// import { history } from "../..";
// import { DashboardContent } from "./DashboardContent";
// import { UserComponent } from "../Users/UserComponent";
// import { BuildingComponent } from "../Buildings/BuildingComponent";
// import { RoomComponent } from "../Rooms/RoomComponent";
// import { useDispatch, useSelector } from "react-redux";
// import { authSignOut } from "../../actions";
// import { InventoryItemComponent } from "../Inventory/InventoryItemComponent";
// import { InventoryComponent } from "../Inventory/InventoryComponent";
// import { DepartmentInventoryItemContent } from "../Inventory/Department/DepartmentInventoryItemContent";
// import { TransferRequestComponent } from "../Workers/TransferRequest/TransferRequestComponent";
// import { ErrorMessage } from "../Commons/ErrorMessage";
// import notificationActions from "../../actions/notificationActions";
// import modalActions from "../../actions/modalActions";
// import { MessageModal } from "../Commons/MessageModal";
// import { RepairRequestComponent } from "../Workers/RepairRequest/RepairRequestComponent";
// import { JobOrderComponent } from "../JobOrders/JobOrderComponent";

// export const DashboardLayoutBak = () => {
//   const { user } = useSelector((state) => state.auth);
//   const { notifications } = useSelector((state) => state.notification);
//   const modal = useSelector((state) => state.modal);

//   const dispatch = useDispatch();

//   return (
//     <Fragment>
//       {/* MODAL */}
//       <Modal size="tiny" closeOnDimmerClick={false} open={modal.open}>
//         <Modal.Header>{modal.title}</Modal.Header>
//         {modal.errorMessages && (
//           <Modal.Content style={{ paddingBottom: "0px" }}>
//             <ErrorMessage errors={modal.errorMessages} />
//           </Modal.Content>
//         )}
//         {modal.content}
//       </Modal>

//       {/* TOP MENU BAR */}
//       <Menu inverted style={{ marginTop: "0px" }}>
//         <Menu.Menu position="right">
//           <Menu.Item style={{ paddingRight: "0px" }}>
//             <Label color="red" size="mini">
//               {notifications.length}
//             </Label>
//           </Menu.Item>

//           <Dropdown item icon="bell" direction="left">
//             <Dropdown.Menu>
//               {notifications.length === 0 ? (
//                 <Dropdown.Header>No notifications to display.</Dropdown.Header>
//               ) : (
//                 <Dropdown.Header>
//                   <div style={{ overflow: "auto", verticalAlign: "middle" }}>
//                     <span style={{ lineHeight: "30px", fontSize: "14px" }}>
//                       Notifications{" "}
//                     </span>
//                     <span style={{ float: "right" }}>
//                       <Button
//                         basic
//                         size="mini"
//                         color="blue"
//                         onClick={() => {
//                           notificationActions.readAll(dispatch);
//                         }}
//                       >
//                         Mark All as Read
//                       </Button>
//                     </span>
//                   </div>
//                 </Dropdown.Header>
//               )}
//               {notifications.map((notif, index) => (
//                 <Dropdown.Item
//                   key={index}
//                   className="notification-unread"
//                   onClick={() => {
//                     modalActions.openModal(
//                       dispatch,
//                       "Notification",
//                       <MessageModal message={notif.message} />
//                     );
//                     notificationActions.read(
//                       dispatch,
//                       [...notifications],
//                       notif.id
//                     );
//                   }}
//                 >
//                   <div
//                     style={{
//                       maxWidth: "700px",
//                       minWidth: "300px",
//                       width: "max-content",
//                       whiteSpace: "nowrap",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       padding: "5px",
//                       fontSize: "12px",
//                       backgroundColor: "#f5f5f5",
//                     }}
//                     dangerouslySetInnerHTML={{ __html: notif.message }}
//                   ></div>
//                 </Dropdown.Item>
//               ))}
//             </Dropdown.Menu>
//           </Dropdown>

//           <Dropdown item text={user.name}>
//             <Dropdown.Menu>
//               <Dropdown.Item
//                 onClick={() => {
//                   authSignOut(dispatch);
//                 }}
//               >
//                 {" "}
//                 <Icon name="sign-out" />
//                 Logout
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </Menu.Menu>
//       </Menu>

//       <Menu
//         inverted
//         vertical
//         style={{
//           height: "100vh",
//           position: "fixed",
//           margin: "0",
//           top: "0",
//           overflowY: "auto",
//         }}
//       >
//         <Menu.Item>
//           <h4>Inventory System</h4>
//           <Label
//             style={{
//               float: "initial",
//               margin: "0",
//               textTransform: "capitalize",
//             }}
//             size="small"
//           >
//             {user.role.toUpperCase()}
//           </Label>
//         </Menu.Item>

//         <NavLink to="/dashboard" activeClassName="link-active">
//           <Menu.Item>
//             <Icon name="grid layout" />
//             <span style={{ color: "rgba(255,255,255, .65)" }}>Dashboard</span>
//           </Menu.Item>
//         </NavLink>

//         <Menu.Item>
//           <Menu.Menu>
//             {["admin"].includes(user.role) && (
//               <>
//                 <Menu.Item>
//                   <NavLink to="/users" activeClassName="link-active">
//                     <Icon name="users" />
//                     Users
//                   </NavLink>
//                 </Menu.Item>

//                 <Menu.Item>
//                   <NavLink to="/buildings" activeClassName="link-active">
//                     <Icon name="building" />
//                     Buildings
//                   </NavLink>
//                 </Menu.Item>

//                 <Menu.Item>
//                   <NavLink to="/rooms" activeClassName="link-active">
//                     <Icon name="home" />
//                     Rooms
//                   </NavLink>
//                 </Menu.Item>
//               </>
//             )}

//             {["admin", "department"].includes(user.role) && (
//               <Menu.Item>
//                 <NavLink to="/inventory" activeClassName="link-active">
//                   <Icon name="box" />
//                   Inventory
//                 </NavLink>
//               </Menu.Item>
//             )}

//             {["admin", "its", "ppfo"].includes(user.role) && (
//               <>
//                 <Menu.Item>
//                   <NavLink
//                     to="/transfer-requests"
//                     activeClassName="link-active"
//                   >
//                     <Icon name="dolly flatbed" />
//                     Transfer Requests
//                   </NavLink>
//                 </Menu.Item>

//                 <Menu.Item>
//                   <NavLink to="/repair-requests" activeClassName="link-active">
//                     <Icon name="wrench" />
//                     Repair Requests
//                   </NavLink>
//                 </Menu.Item>
//               </>
//             )}

//             {["admin"].includes(user.role) && (
//               <>
//                 <Menu.Item>
//                   <NavLink to="/job-orders" activeClassName="link-active">
//                     <Icon name="list" />
//                     Job Orders
//                   </NavLink>
//                 </Menu.Item>
//               </>
//             )}
//           </Menu.Menu>
//         </Menu.Item>
//       </Menu>

//       <div style={{ marginLeft: "16rem", paddingRight: "1em" }}>
//         <div
//           style={{
//             backgroundColor: "red",
//             color: "white",
//             marginBottom: "1em",
//             fontWeight: "bold",
//             padding: "25px",
//           }}
//         >
//           <Icon name="warning" />
//           THIS SYSTEM IS IN DEBUG MODE.
//         </div>
//         <Switch>
//           <Route path="/dashboard" component={DashboardContent} />
//           <Route path="/users" component={UserComponent} />
//           <Route path="/buildings" component={BuildingComponent} />
//           <Route path="/rooms" component={RoomComponent} />
//           <Route
//             path="/inventory/:id/rooms/:roomID"
//             component={DepartmentInventoryItemContent}
//           />
//           <Route path="/inventory/:id" component={InventoryItemComponent} />
//           <Route path="/inventory" component={InventoryComponent} />

//           <Route
//             path="/transfer-requests"
//             component={TransferRequestComponent}
//           />

//           <Route path="/repair-requests" component={RepairRequestComponent} />

//           <Route path="/job-orders" component={JobOrderComponent} />

//           <Route path="/">
//             <Redirect to="/dashboard" />
//           </Route>
//         </Switch>

//         <div
//           style={{
//             backgroundColor: "red",
//             color: "white",
//             marginTop: "1em",
//             fontWeight: "bold",
//             padding: "25px",
//           }}
//         >
//           <Icon  name="warning" />
//           THIS SYSTEM IS IN DEBUG MODE.
//         </div>
//       </div>
//     </Fragment>
//   );
// };
