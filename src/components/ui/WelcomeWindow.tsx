type Props = { onStart: () => void };
export default function WelcomeWindow({ onStart }: Props) {
  return (
    <div className="welcome">
      <img className="welcome__computer" src="/images/1996/desktop-computer.svg" alt="" />
      <h1>
        WELCOME BACK.
        <br />
        IT'S 1996.
      </h1>
      <p>Your time capsule is almost ready.</p>
      <p>
        Find a photo, choose your soundtrack
        <br />
        and leave a message for your future self.
      </p>
      <button type="button" className="retro-button welcome__action" onClick={onStart}>
        Let's Go!
      </button>
    </div>
  );
}
