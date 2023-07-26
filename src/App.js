import './App.css';


import Registration from './Components/Pages/Registration';
import Login from './Components/Pages/Login';
import Home from './Components/Pages/Home';
import Dashboard from './Components/DashboardComponents/Dashboard';
// import Profile from './Components/DashboardComponents/Profile';
import EditProfile from './Components/DashboardComponents/EditProfile';
import AdminNavbar from './Components/AdminComponents/AdminNavbar';
import { Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'react-confirm-alert/src/react-confirm-alert.css'
import About from './Components/Pages/About'
import { Contact } from './Components/Pages/Contact';
import CreateQuiz from './Components/AdminComponents/quiz/CreateQuiz';
import ViewQuiz from './Components/AdminComponents/quiz/ViewQuiz';
import AdminTable from './Components/AdminComponents/quiz/AdminTable';
import AddQuestion from './Components/AdminComponents/quiz/AddQuestion';
import ViewQuestion from './Components/AdminComponents/quiz/ViewQuestion';
import ViewUser from './Components/UserComponents/quiz/ViewUser';
import QuestionSession from './Components/UserComponents/quiz/QuestionSession';
import SingleQuestion from './Components/AdminComponents/quiz/SingleQuestion';
import TableQuiz from './Components/AdminComponents/quiz/TableQuiz';
import Quizes from './Components/UserComponents/quiz/Quizes';
import Categories from './Components/UserComponents/quiz/Categories';
import CategoriesSingle from './Components/UserComponents/quiz/CategorySingle';
import UpdateQuestion from './Components/AdminComponents/quiz/UpdateQuestion';
import UpdateQuiz from './Components/AdminComponents/quiz/UpdateQuiz';
import AvailableQuiz from './Components/UserComponents/quiz/AvailableQuiz';
import SaveQuiz from './Components/UserComponents/quiz/SaveQuiz';
import Knowmore from './Components/CommonComponents/Knowmore';
import Cashout from './Components/CommonComponents/Cashout';
import Resultassesment from './Components/UserComponents/quiz/Resultassesment';
import ResetPassword from './Components/Pages/ResetPassword';
import Userprofile from './Components/DashboardComponents/Userprofile';
import Userdetails from './Components/AdminComponents/quiz/Userdetails';
import Viewalluserdetails from './Components/AdminComponents/quiz/Viewalluserdetails';
import Leaderboard from './Components/UserComponents/quiz/Leaderboard';
function App() {
  return (
    <>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/about-us' exact={true} component={About} />
        <Route path='/contact-us' exact={true} component={Contact} />
        <Route path='/home' component={Home} />
        <Route path='/registration' component={Registration} />
        <Route path='/login' component={Login} />
        <Route path='/dashboard' component={Dashboard} />
        {/* <Route path='/profile' component={Profile} /> */}
        <Route path='/editprofile' component={EditProfile} />
        <Route path='/create-quiz' component={CreateQuiz} />
        <Route path='/view-quiz' component={ViewQuiz} />
        <Route path="/admin-table" component={AdminTable} />
        <Route path="/add-question" component={AddQuestion} />
        <Route path="/view-question" component={ViewQuestion}/>
        <Route path="/view-user" component={ViewUser}/>
        <Route path="/quiz/:id" component={QuestionSession}/>
        <Route path="/single-question/:id" component={SingleQuestion}/>
        <Route path="/table-quiz" component={TableQuiz}/>
        <Route path="/available-quizes" component={Quizes}/>
        <Route path="/update-question/:id" component={UpdateQuestion}/>
        <Route path="/update-quiz/:id" component={UpdateQuiz}/>
        <Route path="/categories" component={Categories}/>
        <Route path="/category-single/:id" component={CategoriesSingle}/>
        <Route path="/quizchoose" component={AvailableQuiz}/>
        <Route path='/savequiz' component={SaveQuiz}/>
        <Route path='/knowmore' component={Knowmore}/>
        <Route path='/cashout'component={Cashout}/>
        <Route path='/resultassessment' component={Resultassesment}/>
        <Route path="/reset-password" component={ResetPassword}></Route>
        <Route path='/profile'component={Userprofile}/>
        <Route path='/admin-dashboard'component={Userdetails}/>
        <Route path='/viewuserdetails'component={Viewalluserdetails}/>
        <Route path="/leaderboard" component={Leaderboard}/>
        </Switch>
    </>
  );
}



export default App;