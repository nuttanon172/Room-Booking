package main

import (
	"crypto/rand"
	"encoding/hex"
)

func generateRandomFileName() string {
	bytes := make([]byte, 8)
	_, err := rand.Read(bytes)
	if err != nil {
		return "default_filename"
	}
	return hex.EncodeToString(bytes)
}

func getImageContentType(filename string) string {
	switch {
	case filename[len(filename)-4:] == ".png":
		return "image/png"
	case filename[len(filename)-4:] == ".jpg" || filename[len(filename)-5:] == ".jpeg":
		return "image/jpeg"
	case filename[len(filename)-4:] == ".gif":
		return "image/gif"
	default:
		return "application/octet-stream" // Fallback content type
	}
}
