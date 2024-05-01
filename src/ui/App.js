import React, { useState } from 'react';
import UserForm from './UserForm';
import AdminApproval from './AdminApproval';



function App() {
  const [requests, setRequests] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [notification, setNotification] = useState(null);

  const sendNotification = (notificationData) => {
    setNotification(notificationData);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Remove notification after 3 seconds
  };

  const handleSubmitRequest = (formData) => {
    setRequests([...requests, formData]);
    sendNotification({
      type: 'info',
      message: 'Your request has been submitted',
    });
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const handleApproveRequest = (index) => {
    const updatedRequests = [...requests]; // Make a copy of requests
    
    updatedRequests.splice(index, 1); // Remove the approved request
    setRequests(updatedRequests);
    sendNotification({
      type: 'success',
      message: 'Your on-duty request has been approved',
    });
  };

  const handleRejectRequest = (index) => {
    const updatedRequests = [...requests]; // Make a copy of requests
    
    updatedRequests.splice(index, 1); // Remove the rejected request
    setRequests(updatedRequests);
    sendNotification({
      type: 'error',
      message: 'Your request has been rejected',
    });
  };

  const handleBackToUserForm = () => {
    setIsAdminLoggedIn(false);
  };

  return (
    <div>
      {!isAdminLoggedIn ? (
        <UserForm onSubmit={handleSubmitRequest} onAdminLogin={handleAdminLogin} />
      ) : (
        <AdminApproval
          requests={requests}
          onApprove={(index) => handleApproveRequest(index)}
          onReject={(index) => handleRejectRequest(index)}
          onBack={handleBackToUserForm}
          sendNotification={sendNotification} // Pass sendNotification function to AdminApproval
        />
      )}
      {notification && (
        <div className={`notification ${notification.type}`}>
          <p>{notification.message}</p>
        </div>
      )}
    </div>
  );
}


export default App;
