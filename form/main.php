// 判斷是否有上傳檔案
if (isset($_FILES['photo']) && $_FILES['photo']['error'] == UPLOAD_ERR_OK) {

  // 設定檔案上傳路徑
  $upload_dir = __DIR__ . '/upload/';
  $upload_file = $upload_dir . basename($_FILES['photo']['name']);

  // 將檔案移動至指定的路徑
  if (move_uploaded_file($_FILES['photo']['tmp_name'], $upload_file)) {
    echo "The file " . basename($_FILES['photo']['name']) . " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }

} else {
  echo "No files uploaded or there was an error uploading the file.";
}
