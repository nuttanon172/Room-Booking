package main

import (
	"database/sql"
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func getRoomHandler(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	room, err := getRoom(id)
	if err != nil {
		if err == sql.ErrNoRows {
			return c.SendStatus(fiber.StatusNotFound)
		}
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.JSON(room)
}

func getRoomsHandler(c *fiber.Ctx) error {
	rooms, err := getRooms()
	if err != nil {
		if err == sql.ErrNoRows {
			return c.SendStatus(fiber.StatusNotFound)
		}
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.JSON(rooms)
}

func createRoomHandler(c *fiber.Ctx) error {
	room := new(Room)
	err := c.BodyParser(room)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	err = createRoom(room)
	if err != nil {
		fmt.Println(err)
		return err
	}
	return c.JSON(fiber.Map{
		"message": "Create Room Successfully",
	})
}

func updateRoomHandler(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	room := new(Room)
	err = c.BodyParser(room)
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	err = updateRoom(id, room)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.JSON(room)
}

func deleteRoomHandler(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}
	err = deleteRoom(id)
	if err != nil {
		return err
	}
	return c.JSON(fiber.Map{
		"message": "Delete Room Successfully",
	})
}

func getDepartmentsHandler(c *fiber.Ctx) error {
	departments, err := getDepartments()
	if err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}
	return c.JSON(departments)
}

func getRolesHandler(c *fiber.Ctx) error {
	roles, err := getRoles()
	if err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}
	return c.JSON(roles)
}

func getMenusHandler(c *fiber.Ctx) error {
	menus, err := getMenus()
	if err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}
	return c.JSON(menus)
}

func getPermissionsHandler(c *fiber.Ctx) error {
	permissions, err := getPermissions()
	if err != nil {
		return c.SendStatus(fiber.StatusNotFound)
	}
	return c.JSON(permissions)
}

func getBookingsHandler(c *fiber.Ctx) error {
	bookings, err := getBookings()
	if err != nil {
		fmt.Println(err)
		return c.SendStatus(fiber.ErrBadGateway.Code)
	}
	return c.JSON(bookings)
}

func loginHandler(c *fiber.Ctx) error {
	user := new(User)
	if err := c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString(err.Error())
	}

	if err := verifyUser(user.Email, user.Password); err != nil {
		return err
	}

	// Create token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["email"] = user.Email
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	return c.JSON(fiber.Map{
		"message": "Login Success",
		"token":   t,
	})
}

func registerHandler(c *fiber.Ctx) error {
	employee := new(Employee)
	err := c.BodyParser(&employee)
	if err != nil {
		return err
	}
	err = createEmployee(employee)
	if err != nil {
		return err
	}
	return c.JSON(fiber.Map{
		"message": "Register Successfully",
	})
}