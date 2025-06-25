import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Avatar,
  Typography,
  IconButton,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Edit as EditIcon,
  Logout as LogoutIcon,
  CalendarToday as CalendarIcon,
  MenuBook as BookIcon,
  Star as StarIcon,
  TrendingUp as TrendingIcon,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { useBooks } from "../contexts/BookContext";

const UserProfile = ({ open, onClose }) => {
  const { user, logout, updateProfile } = useAuth();
  const { getBookStats } = useBooks();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const stats = getBookStats();

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    const result = await updateProfile(editForm);
    if (result.success) {
      setIsEditing(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: user?.name || "",
      email: user?.email || "",
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">User Profile</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {updateSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Profile updated successfully!
          </Alert>
        )}

        {/* Profile Header */}
        <Box display="flex" alignItems="center" gap={3} mb={3}>
          <Avatar src={user.avatar} sx={{ width: 80, height: 80 }}>
            {user.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box flex={1}>
            {isEditing ? (
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Name"
                  value={editForm.name}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  size="small"
                  fullWidth
                />
                <TextField
                  label="Email"
                  value={editForm.email}
                  onChange={(e) => handleEditChange("email", e.target.value)}
                  size="small"
                  fullWidth
                  type="email"
                />
              </Box>
            ) : (
              <>
                <Typography variant="h6" fontWeight={600}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Member since {formatDate(user.createdAt)}
                </Typography>
              </>
            )}
          </Box>
          {!isEditing && (
            <IconButton onClick={() => setIsEditing(true)} color="primary">
              <EditIcon />
            </IconButton>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Reading Statistics */}
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Reading Statistics
        </Typography>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2} mb={3}>
          <Box textAlign="center" p={2} bgcolor="primary.50" borderRadius={2}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {stats.total}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Books
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="success.50" borderRadius={2}>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {stats.finished}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Books Read
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="primary.50" borderRadius={2}>
            <Typography variant="h4" color="primary.main" fontWeight="bold">
              {stats.currentlyReading}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Currently Reading
            </Typography>
          </Box>
          <Box textAlign="center" p={2} bgcolor="info.50" borderRadius={2}>
            <Typography variant="h4" color="info.main" fontWeight="bold">
              {stats.wishlist}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Wishlist
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Account Actions */}
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Account
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <PersonIcon color="action" />
            </ListItemIcon>
            <ListItemText primary="Account Type" secondary="Free Account" />
            <Chip label="Free" color="primary" size="small" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CalendarIcon color="action" />
            </ListItemIcon>
            <ListItemText
              primary="Member Since"
              secondary={formatDate(user.createdAt)}
            />
          </ListItem>
        </List>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        {isEditing ? (
          <>
            <Button onClick={handleCancelEdit} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} variant="contained">
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              color="error"
            >
              Logout
            </Button>
            <Button onClick={onClose} variant="contained">
              Close
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default UserProfile;
