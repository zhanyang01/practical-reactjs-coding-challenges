import './index.scss'

interface BottomResult {
  avgReadingTime : string,
  longestWord : string
}

const BottomResultBox = ({bottomResult} : {bottomResult : BottomResult}) => {
  const {avgReadingTime, longestWord } = bottomResult
  const bottomResultBar = [
    {
      title: 'Average Reading Time:',
      value: avgReadingTime,
    },
    {
      title: 'Longest word:',
      value: longestWord,
    },
  ]

  return (
    <div className="bottom-result-bar">
      {bottomResultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default BottomResultBox
