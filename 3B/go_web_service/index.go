package main
import(
	"./lib"
	"github.com/labstack/echo"
	"net/http"
	"encoding/json"
	"github.com/labstack/echo/middleware"
)

func hello(c echo.Context)error {
	return c.String(http.StatusOK, "Hi to everyone. I' am alive!! :)")
}

/* response_moves: create a web service on  "EXECUTION_DOMAIN:PORT/vitamin/moves"
  getting as input the configuration of the vitamins eg: "3B 4B 5G 6W"
 and returning the list of moves to make the colors of the shapes white
*/

func response_moves(c echo.Context)error{
	if len(c.FormValue("vitamins"))==0{
		return c.String(http.StatusNotFound,"No vitamins!" )}
	tmp, _ := json.Marshal(lib.MakeAllWhite(c.FormValue("vitamins")))
	return c.String(http.StatusOK,string(tmp) )
}

/*response_status: create a web service on  "EXECUTION_DOMAIN:PORT/vitamin/status"
 getting as input the configuration of the vitamins eg: "3B 4B 5G 6W" and a list
 and returning the list of status changed during the transition
 to make the colors of the shapes white
*/


func response_status(c echo.Context)error{
	if len(c.FormValue("vitamins"))==0{
		return c.String(http.StatusNotFound,"No vitamins!" )}
	s_vitamins := c.FormValue("vitamins")
	moves_list := lib.MakeAllWhite(s_vitamins)
	tmp, _ := json.Marshal(lib.MakeAllWhiteStatus(
		s_vitamins,moves_list))
	return c.String(http.StatusOK,string(tmp) )
}

func main(){
	e:= echo.New()
	e.GET("/",hello)
	e.POST("/",hello)
	e.GET("/vitamin/moves",response_moves)
	e.POST("/vitamin/moves",response_moves)
	e.GET("/vitamin/statuses",response_status)
	e.POST("/vitamin/statuses",response_status)
	e.Use(middleware.CORS())
	e.Logger.Fatal(e.Start(":5000"))
}