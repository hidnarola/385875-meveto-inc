import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Grid, Select, MenuItem, FormHelperText, makeStyles, Container, Button, TextareaAutosize, CircularProgress } from '@material-ui/core';
import { ENGLISH_LITERATURE, TECHNICAL_REPORT_WRITING, COMPUTER_SCIENCES } from '../../shared/constants';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { green } from '@material-ui/core/colors';
import TransitionsModal from '../modal/TransitionsModal';
import moment from 'moment';



const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));


export default function RegisterForm() {
  const [course, setCourse] = React.useState('technical_report_writing');
  const [courseList, setCourseList] = React.useState(TECHNICAL_REPORT_WRITING);
  const [subjectItem, setSubjectItem] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [additionalNote, setAdditionalNote] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const timer = React.useRef();
  const [success, setSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState({
    course: "",
    subjectItem: "",
    selectedDate: "",
    additionalNote: ""
  });

  const classes = useStyles();
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (checkForm()) {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = setTimeout(() => {
          setSuccess(true);
          setLoading(false);
          console.info('------------------------------------');
          console.info('submitted => ');
          console.info('course => ', course);
          console.info('subjectItem=> ', subjectItem);
          console.info('selectedDate => ', selectedDate);
          console.info('additionalNote=> ', additionalNote);
          console.info('------------------------------------');
          setOpen(true);
        }, 2000);
      }
    }

  };

  const checkForm = () => {
    var errors = {};
    var flag = true;
    if (course.length <= 0) {
      flag = false;
      errors.course = "Requied Course"
    }
    if (subjectItem.length <= 0) {
      flag = false;
      errors.subjectItem = "Requied Subject"
    }
    if (selectedDate.length <= 0) {
      flag = false;
      errors.selectedDate = "Requied Date"
    } else {
      //   invalid dates list
      //   20 December, 2019;
      //   15 January, 2020;
      //   1 February, 2020
      var invalidDates = ['20-12-12019', '15-01-2020', '01-02-2020'];
      var date = moment(selectedDate).format("DD-MM-YYYY");
      if (invalidDates.indexOf(date) >= 0) {
        flag = false;
        errors.selectedDate = "Your selected course and subject is not offered beginning from your selected date";
      }

    }

    if (additionalNote.length > 0 && (additionalNote.length < 20 || additionalNote.length > 500)) {
      flag = false;
      errors.additionalNote = "Additional note should be between 20-500"
    }
    setErrors(errors);
    return flag;
  }


  const courseChangeHandler = event => {
    setCourse(event.target.value);
    setSubjectItem('');

    var courseListArray = [];
    switch (event.target.value) {
      case "technical_report_writing":
        courseListArray = TECHNICAL_REPORT_WRITING
        break;
      case "english_literature":
        courseListArray = ENGLISH_LITERATURE
        break;
      case "computer_sciences":
        courseListArray = COMPUTER_SCIENCES
        break;
      default:
        courseListArray = [];
        break;
    }
    setCourseList(courseListArray);
  };


  const dateChangeHandler = date => {
    setSelectedDate(date);
  };

  const closeHandler = () => {
    setOpen(false);
  }

  const subjectItemHandler = event => {
    setSubjectItem(event.target.value);
  };

  const additionalNoteHandler = event => {
    setAdditionalNote(event.target.value);
  };

  return (
    <Container>
      <Grid container>
        <Grid item >
          <Grid container direction={"column"} justify={"center"}>

            <Grid item xs={12}>
              <h1>Register Form</h1>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup aria-label="course" name="course" value={course} onChange={courseChangeHandler} row>
                  <FormControlLabel
                    value="technical_report_writing"
                    control={<Radio color="primary" />}
                    label="Technical Report Writing"
                    labelPlacement="left"
                  />
                  <FormControlLabel
                    value="english_literature"
                    control={<Radio color="primary" />}
                    label="English Literature"
                    labelPlacement="left"
                  />
                  <FormControlLabel
                    value="computer_sciences"
                    control={<Radio color="primary" />}
                    label="Computer Sciences"
                    labelPlacement="left"
                  />
                </RadioGroup>
                <FormHelperText>{errors.course}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Grid container justify={""} alignItems={"center"}>
                <Grid item xs={3}> Subject </Grid>
                <Grid item xs={6}>
                  <FormControl style={{ width: "100%" }} className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={subjectItem}
                      onChange={subjectItemHandler}
                    >
                      {
                        courseList.map(item =>
                          <MenuItem value={item.value}>{item.label}</MenuItem>
                        )
                      }
                    </Select>
                    <FormHelperText>{errors.subjectItem}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container justify={""} alignItems={"center"}>
                <Grid item xs={3}> Start Date </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={dateChangeHandler}
                  />
                  <FormHelperText>{errors.selectedDate}</FormHelperText>
                </Grid>
              </Grid>

            </Grid>

            <Grid item xs={12}>
              <Grid container justify={""} alignItems={"center"}>
                <Grid item xs={3}> Additional Notes </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <TextareaAutosize onChange={additionalNoteHandler} aria-label="empty textarea" placeholder="Additional Notes" rows={5} rowsMin={3} />
                    <FormHelperText>{errors.additionalNote}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={handleButtonClick}
                >
                  {loading ? "Submiting..." : "Submit"}
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </Grid>


          </Grid>
          <TransitionsModal open={open} closeHandler={closeHandler} />
        </Grid>
      </Grid>
    </Container>
  )
}
