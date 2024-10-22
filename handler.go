package main

import (
	"database/sql"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
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
