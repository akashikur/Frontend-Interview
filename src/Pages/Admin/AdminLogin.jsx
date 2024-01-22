const AdminLogin = () => {
  return (
    <div className="login">
      <form>
        <label>Email</label>
        <input type="email" />
        <label>Password</label>
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminLogin;
