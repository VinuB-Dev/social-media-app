export default function UserCard() {
  return (
    <div className="card">
      <div>
        <img
          className="profile-img"
          src={
            "https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png"
          }
          alt=""
        />
      </div>
      <div className="username">Vignesh</div>
      <div className="status">Hey guys</div>
      <button className="follow-btn">+ Follow</button>
    </div>
  );
}
