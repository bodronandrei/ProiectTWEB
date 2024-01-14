import Autor from "./views/Autor";
import AutorEdit from "./views/AutorEdit";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Organizator from "./views/Organizator";
import OrganizatorEdit from "./views/OrganizatorEdit";
import Reviewer from "./views/Reviewer";
import ReviewerEdit from "./views/ReviewerEdit";

export const routes = Object.freeze([
{ 
    path:"/", 
    component: Login, 
    name: "Login" 
},
{ 
    path:"/Organizator", 
    component: Organizator, 
    name: "Organizator" 
},
{ 
    path:"/Autor", 
    component: Autor, 
    name: "Autor" 
},
{ 
    path:"/Reviewer", 
    component: Reviewer, 
    name: "Reviewer" 
},
{ 
    path: "*", 
    component: NotFound, 
    name: null
},
{
    path:"/EditOrganizator/:id",
    component: OrganizatorEdit,
    name: null
},
{
    path:"/EditAutor/:id",
    component: AutorEdit,
    name: null
},
{
    path:"/EditReviewer/:id",
    component: ReviewerEdit,
    name: null
},
{
    path:"/NewConferinta/",
    component: OrganizatorEdit,
    name: null
},
{
    path:"/NewArticol/",
    component: AutorEdit,
    name: null
},
{
    path:"/NewReviewer/",
    component: ReviewerEdit,
    name: null
}

]);
