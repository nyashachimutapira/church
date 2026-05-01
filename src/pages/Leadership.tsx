import React from "react";
import "./Leadership.css";
import founderProfile from "../assets/leadership/founder.png";

import pastorTimProfile from "../assets/leadership/pastor_tim.jpg";
import pastorMaggyProfile from "../assets/leadership/pastor_maggy.png";
import cofounderEunorProfile from "../assets/leadership/cofounder_eunor.png";
import execJosephProfile from "../assets/leadership/exec_joseph.png";
import execNyashaProfile from "../assets/leadership/exec_nyasha.png";

type Leader = {
  name: string;
  role?: string;
  description: string;
  imageSrc?: string;
};

const leadership: { pastors: Leader[]; founders: Leader[]; executives: Leader[] } = {
  pastors: [
    {
      name: "Pastor Tim Njavha",
      description:
        "Add a short profile here: background, ministry focus, and a warm welcome message to visitors.",
      imageSrc: pastorTimProfile,
    },
    {
      name: "Pastor Maggy Njavha",
      description:
        "Add a short profile here: background, ministry focus, and how she supports and leads the church community.",
      imageSrc: pastorMaggyProfile,
    },
  ],
  founders: [
    {
      name: "Archbishop Ezekiel Handinawangu Guti",
      role: "Founder (ZAOGA FIF / Forward in Faith Ministries International)",
      description: `Archbishop Professor Ezekiel Handinawangu Guti was a truly unique transformational champion and legend; a highly anointed General, mentor, and the Spiritual Father to millions of people world wide. He distinguished himself both in the spiritual and academic world, as a hardworking scholar and author. His exemplary Christian life and wise leadership transformed many lives within Africa and around the whole world, as he touched lives in the six continents of the world with the precious seed of the true saving Gospel of the Lord Jesus Christ for a period of over eight decades of his 100 years of life on earth. He was an outstanding Pentecostal Icon, evangelist, prophet, apostle, pastor, leader, counsellor and teacher who preached the saving Gospel of the Lord Jesus Christ for 75 years non-stop. He was a humble servant of God with unmistakable marks of seasoned apostleship upon him. He held a Doctorate of Ministry and a Ph.D. in Religion. He founded the largest and fastest growing Pentecostal Church in the Southern and Central region of Africa, ZAOGA Forward In Faith Ministries International. The Lord God used him to plant thousands of churches around the globe and he was a father to thousands of pastors and Christian leaders world-wide. He established several bible schools in Zimbabwe, Mozambique, South Africa, Zambia, Tanzania, Ghana where students are trained for full time ministry. In addition, he established hundreds of part time and online Bible schools not only in Zimbabwe but also across the globe where lay leaders are trained and equipped to do the work of the ministry. Archbishop Professor Ezekiel H. Guti founded many ministries that serve specific areas in the lives of God's people, these include Africa Christian Business Fellowship (ACBF), Gracious Women Fellowship and Husbands Agape Fellowship, FIF children's homes, ministry to the blind, ministry to the disabled (or people with special needs), Forward in Faith College and High school Ministry, Ministry for the prisoners, to name just a few. His ministry trained Chaplains who serve in the security forces, prisons and hospitals. In his lifetime he received several awards from all over the world, which include the following: Kingdom Service Award by the Evangelical Fellowship of Zimbabwe; Kingdom Statesman Award by the International Third World Leaders Association of the Bahamas; Career and Leadership Legacy Builder Award, and a Lifetime Achievement Award from the Zimbabwe National Chamber Of Commerce, and the Gospel Veterans Award from South Africa. Archbishop Professor Ezekiel H. Guti received the honorary Doctor of Philosophy in Social Entrepreneurship Degree, (Honoris Causa) from ZEGU in 2021. Also in August 2021, the President of the Republic of Zimbabwe, publicly honoured Archbishop Professor Ezekiel H. Guti with the prestigious Award of the Order of the Star of Zimbabwe Gold, which is the highest honour in the country of Zimbabwe. So far Archbishop Professor Ezekiel H. Guti is the only minister of religion who has received such a prestigious award in the nation of Zimbabwe. He was a spiritual father to many leaders of other churches outside of ZAOGA-FIF. He also established several institutions, including: 5 primary schools, and 8 high schools in Zimbabwe and others in Mozambique, Liberia, and Sierra Leone. He established the Zimbabwe Ezekiel Guti University (ZEGU) in 2012, and also the Mbuya Dorcas Hospital and Health Centre. The hospital is unique in that it has a non-medicine wing where people receive counselling and prayers, with outstanding results of deliverance. Archbishop Professor Ezekiel H. Guti also established a 24 hour satellite Television Station called Ezekiel TV which is also available online. Archbishop Professor Ezekiel Guti established churches in 177 nations and states in Six Continents of the World, and he continued to plant new churches and win many souls to the Lord Jesus Christ, even at 100 years of age. He was used mightily as a prophet, teacher, evangelist, and marriage counsellor, whose wisdom was sought after by people from all walks of life from politicians to ordinary citizens, captains of industry to the less educated, and even leaders of other churches. He was famous for the saying: "people are people." His burden was to see the standard of people raised as they operate in the Kingdom of God. As an evangelist outstanding and mighty miracles characterized his ministry for 75 years non-stop. He was a man of love, passionate soul winner, a fervent intercessor and had a great fatherly heart. After serving many generations, Archbishop Professor Ezekiel Handinawangu Guti "fell asleep" on 5 July 2023, and the ZAOGA-FIF Church Executive declared thirty days of mourning him and celebrating his unique legacy. He was conferred with the National Hero Status by the Government of the Republic of Zimbabwe, and was laid to his final resting place in Bindura, with full military honours on 10 August 2023. Long live the spirit and legacy of our Patriarch, the African Apostle, the Bond servant of the Lord Jesus Christ, Archbishop Professor Ezekiel Handinawangu Guti.`,
      imageSrc: founderProfile,
    },
    {
      name: "Archbishop Professor Eunor Guti",
      role: "Senior Archbishop (ZAOGA FIF / Forward in Faith Ministries International)",
      description: `President for Gracious Women; Ordained Pastor; First Woman Marriage Officer in Zimbabwe; First female Archbishop in the nation of Zimbabwe. She holds a B.A.; M.A.; D.D. in Ministry from Friends Christian University, U.S.A. A graduate of AMFCC (1978). A graduate of Christ For The Nations Institute, (Vocational training), U.S.A (2004). A State Registered Nurse with Diplomas in Business Administration, Bookkeeping, Dressmaking & Designing, and Christian Broadcasting Radio & T.V. She also holds a Bachelor of Commerce (Honours) Degree in Business Administration and Management from ZEGU. In 2022 she received the highest honour offered by any University to individuals, when ZEGU awarded her with an Honorary Doctorate in Development and Empowerment (Honoris Causa). She is the first International Director for Women's Ministry in ZAOGA-FIFMI for many decades. She says, "Women, Highly favoured of God. Rise up and take your position, not above the husband's head, not under his feet, but side by side next to his heart with a sweet spirit." She believes in being outstanding for God in the things of God before it is 5' 0'clock in the afternoon, time to knock off from office, which is being dismissed from this earthly body. She travelled together with her husband, Archbishop Professor Ezekiel H. Guti planting new Churches and ministering in over 177 nations and states. Has been serving God in fulltime ministry now for 54 years. A Mother (Mum) and a great inspiration and role model to millions in the ministry. She is an author of several books, including the following titles: "A Wise Woman"; "Challenge and Counselling of Today's Youth"; "Ladies Lessons for Home Makers"; "How To Be A Pastor's Wife And Enjoy It"; and recently, "Eunor Guti – A Memoir of Faith and Service." She has motivated many groups of intercession world-wide and spoken in many Women Conferences and Leadership seminars in the U.S.A. and the world over. In 2004 she received the Esthers' Leadership Award from Third World Leaders Association, presented to her by the Honourable Prime Minister of the Bahamas. She also received other awards, such as: The Lifetime Achievement Award by the Zimbabwe International Women's Awards (ZIWA) in UK; an Honorary Doctorate Degree from Jacksonville University, Florida, U.S.A.; the Zimbabwe's Overall Outstanding Woman Award (Exemplary Leadership, Dignity & Inspiration), awarded by MEGAFEST; the Achiever's Award from the International Precious Stones Women's Convention, and also the Iconic Woman Award from the Professional Women Executives and Business Women's Forum (PROWEB) in 2012. She also headed the Good News Deliverance Explo in 2005, in 25 stadiums in Zimbabwe, and many other countries, including: Nigeria, Benin, Malawi, Mozambique, Zambia, Singapore, Fiji, Tonga, and all the States of Australia, preaching the Word of God with great prophetic healing ministry, and with many outstanding signs and wonders following. She is the Visionary for "Today's Woman International Conference" which was launched in 2007.`,
      imageSrc: cofounderEunorProfile,
    }
  ],
  executives: [
    {
      name: "Archbishop Dr. Joseph Joe Guti",
      role: "International Executive Chairman / Father of ZAOGA-FIFMI",
      description: `He holds a B.A.; M.A.; M.TH.; and D. Min. A graduate of U.Z. (Zim), Fort Hare (SA), and FICU, (USA). A seasoned teacher of the Word of God and Bible Lecturer. Appointed by Archbishop Professor Ezekiel H. Guti as one of the Three Apostles to lead the Church of ZAOGA FIFMI, and being the International Executive Chairman and the Father of ZAOGA-FIFMI. Archbishop Dr. Joseph Joe served as the Executive Director at ZEGU for many years and has been the founding Acting Vice Chancellor of ZEGU. Appointed as the new ZEGU Chancellor. Also appointed as the President of the Africa Christian Business Fellowship (ACBF). Has been the International Director of AMFCC-Bible schools, where he has acquired more than thirty-five years experience in Bible Schools administration and lecturing. Winner of the 2017 MEGAFEST National Business Leadership Award, Zimbabwe. Married to Pastor Nyasha Miriam. Ordained as the Presiding Bishop of ZAOGA FIFMI in September 2024. Consecrated as the Archbishop of ZAOGA FIFMI in January 2026.`,
      imageSrc: execJosephProfile,
    },
    {
      name: "Pastor Nyasha Miriam Guti",
      role: "Executive Member of the Travelling Teachers Ministry",
      description: `Holds a B.Sc. Degree in Computer Science (UZ); and a Master of Science Degree in Strategic Management (CUT). She also holds a Diploma in Microfinance Management; a Diploma from AMFCC, as well as a Bachelor of Theology Degree. A well-travelled and a seasoned teacher of the Word of God for many years. She is an Executive member of the Travelling Teachers Ministry. She was the "Super Platinum Winner" of the 2026 Zimbabwe CEO Network – Women In Leadership Award in the Category of "Outstanding Women of Faith and Religion." Currently working as the Deputy Registrar at the Harare Teaching and Learning Centre of ZEGU in Belvedere, Harare. Married to Archbishop Dr. Joseph Joe for 32 years.`,
      imageSrc: execNyashaProfile,
    }
  ],
};

const Leadership: React.FC = () => {
  return (
    <div className="section leadership-page">
      <div className="container">
        <div className="leadership-header">
          <h2 className="serif leadership-title">Leadership</h2>

        </div>

        <div className="glass glass-card leadership-section leadership-founder">
          <h3 className="serif leadership-section-title">Our Founders</h3>
          <div className="leadership-grid">
            {leadership.founders.map((founder) => (
              <article key={founder.name} className="leadership-founder-row">
                {founder.imageSrc ? (
                  <img
                    className="leadership-avatar leadership-avatar--founder leadership-avatar-image"
                    src={founder.imageSrc}
                    alt={`${founder.name} profile`}
                    loading="lazy"
                  />
                ) : (
                  <div className="leadership-avatar leadership-avatar--founder" aria-hidden="true" />
                )}
                <div>
                  <h4 className="serif leadership-card-name">{founder.name}</h4>
                  <p className="leadership-card-role">{founder.role}</p>
                  <p className="leadership-card-desc">{founder.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="glass glass-card leadership-section leadership-founder">
          <h3 className="serif leadership-section-title">Executive Leadership</h3>
          <div className="leadership-grid">
            {leadership.executives.map((exec) => (
              <article key={exec.name} className="leadership-founder-row">
                {exec.imageSrc ? (
                  <img
                    className="leadership-avatar leadership-avatar--founder leadership-avatar-image"
                    src={exec.imageSrc}
                    alt={`${exec.name} profile`}
                    loading="lazy"
                  />
                ) : (
                  <div className="leadership-avatar leadership-avatar--founder" aria-hidden="true" />
                )}
                <div>
                  <h4 className="serif leadership-card-name">{exec.name}</h4>
                  <p className="leadership-card-role">{exec.role}</p>
                  <p className="leadership-card-desc">{exec.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="glass glass-card leadership-section">
          <h3 className="serif leadership-section-title">Our Pastors</h3>
          <div className="leadership-grid">
            {leadership.pastors.map((leader) => (
              <article key={leader.name} className="leadership-card">
                {leader.imageSrc ? (
                  <img
                    className="leadership-avatar leadership-avatar-image"
                    src={leader.imageSrc}
                    alt={`${leader.name} profile`}
                    loading="lazy"
                  />
                ) : (
                  <div className="leadership-avatar" aria-hidden="true" />
                )}
                <div className="leadership-card-body">
                  <h4 className="serif leadership-card-name">{leader.name}</h4>
                  {leader.role && <p className="leadership-card-role">{leader.role}</p>}
                  <p className="leadership-card-desc">{leader.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leadership;

