import styled from '@emotion/styled'
const CalendarDiv = styled.div`
  font-family: ${props => props.theme.fonts.english};
  transform: translate(50%,0);
  & * {
    box-sizing: content-box;
  }
  & table.calendar {
    transform: translate(-50%,0);
    border-collapse: collapse;
  }

  & table.calendar thead {
    background-color: #5A5A5A;
    color: white;
    margin-bottom: 3px;
    border-bottom: 2px solid white
  }


  & table.calendar thead th {
    font-weight: normal;
    padding: 10px 3px;
  }

  & table.calendar thead th.bolder {
    font-weight: bold;
  }

  & table.calendar tbody {
    font-size: 0.8em;
  }

  & table.calendar td {
    text-align: center;
    padding: 8px;
    cursor: pointer;
    border: 1px solid rgba(185, 185, 185, 0.13);
    background-color: white;
    min-width: 15px;
  }

  & table.calendar tr:last-child td {
    border-bottom: none;
  }

  & table.calendar td.month-name {
    font-weight: bold;
    text-align: left;
    cursor: default;
    border-left: none;
  }

  & table.calendar td.prev-month,
  & table.calendar td.next-month {
    color: transparent;
    cursor: default;
    pointer-events: none;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAABZJREFUCB1jYEADmzdv/o8iRA0BoIEAKngPeSAlnXcAAAAASUVORK5CYII=');
  }

  & table.calendar td.week-separator {
    pointer-events: none;
    padding: 0;
    width: 8px;
    min-width: 0;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAABZJREFUCB1jYEADmzdv/o8iRA0BoIEAKngPeSAlnXcAAAAASUVORK5CYII=');
  }

  & table.calendar td.bolder {
    font-weight: bold;
  }

  /* Single selected day */
  & table.calendar td.selected {
    background-color: orangered;
    color: white;
    font-weight: bold;
  }

  /* Selected range */
  & table.calendar td.range {
    background-color: rgba(255,69,0, 0.7);
    font-weight: bold;
    color: white;
  }

  & table.calendar td.range-left {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    overflow: hidden;
    background: orangered;
  }

  & table.calendar td.range-right {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    overflow: hidden;
    background: orangered;
  }
  /* hot */
  & table.calendar td.hot {
    box-shadow: inset 0 0 0px 2px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints[2]}) {
    display: none;
  }
`


export default CalendarDiv
