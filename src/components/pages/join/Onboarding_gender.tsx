import { useEffect, useRef, useState } from "react";
import ButtonCommon from "../../UI/ButtonCommon";
import './Onboarding.css';

const Onboarding_gender = () => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const onClick = (gender: string) => {
    setSelectedGender((prevGender: string | null) => {
      return prevGender === gender ? null : gender;
    });
  };

  return (
    <div>
      <h1 className="b-medium">당신의 성별은 무엇인가요?</h1>
      <div style={{ marginTop: '30px' }}>
        <ButtonCommon
          customClassName={`white ${selectedGender === 'female' ? 'default-active' : 'gray'}`}
          size="large"
          onClickBtn={() => onClick('female')}
        >
          여성
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          customClassName={`white ${selectedGender === 'male' ? 'default-active' : 'gray'}`}
          size="large"
          onClickBtn={() => onClick('male')}
        >
          남성
        </ButtonCommon>
      </div>
      <div style={{ marginTop: '15px' }}>
        <ButtonCommon
          customClassName={`white ${selectedGender === 'other' ? 'default-active' : 'gray'}`}
          size="large"
          onClickBtn={() => onClick('other')}
        >
          기타
        </ButtonCommon>
      </div>
    </div>
  );
};

export default Onboarding_gender;