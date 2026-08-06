import os
import urllib.request

images = {
    "avatar.jpg": "https://pixel-p1.s3.sa-east-1.amazonaws.com/doctor/avatar/2ee31edd/2ee31edd-81f3-4595-ae7a-d55fcaed4b98_large.jpg",
    "photo_1.jpg": "https://pixel-p1.s3.sa-east-1.amazonaws.com/doctor/photos/0d5821cf/0d5821cf-8634-4c78-bca8-2363e7ba2564_large.jpg",
    "photo_2.jpg": "https://pixel-p1.s3.sa-east-1.amazonaws.com/doctor/photos/390683b5/390683b5-74e7-4123-9ab3-bde45ecae787_large.jpg",
    "photo_3.jpg": "https://pixel-p1.s3.sa-east-1.amazonaws.com/doctor/photos/26983b6f/26983b6f-d1c6-4c15-8262-ea6eeffa6627_large.jpg",
    "photo_4.jpg": "https://pixel-p1.s3.sa-east-1.amazonaws.com/doctor/photos/2a2d24da/2a2d24da-6371-460a-9477-558d660cbab5_large.jpg",
    "photo_5.jpg": "https://pixel-p1.s3.sa-east-1.amazonaws.com/doctor/photos/07328571/07328571-daf9-4846-9b45-718e343a28cb_large.jpg",
    "photo_6.jpg": "https://pixel-p1.s3.sa-east-1.amazonaws.com/doctor/photos/bca0ecb3/bca0ecb3-bf43-451f-835f-adfd4c9270a1_large.jpg",
    "photo_7.jpg": "https://pixel-p1.s3.sa-east-1.amazonaws.com/doctor/photos/8bddc254/8bddc254-9f5a-4ddd-a522-3bb89e293eff_large.jpg",
    "photo_8.jpg": "https://pixel-p1.s3.sa-east-1.amazonaws.com/doctor/photos/04069c1b/04069c1b-4aea-4c4d-88ac-90fc850d98b4_large.jpg",
    "photo_9.jpg": "https://pixel-p1.s3.sa-east-1.amazonaws.com/doctor/photos/d679d538/d679d538-25e6-4a7b-92db-1d69a65ca726_large.jpg",
    "photo_10.jpg": "https://pixel-p1.s3.sa-east-1.amazonaws.com/doctor/photos/a18e7679/a18e7679-5b3b-4bce-a41e-9819cf91509c_large.jpg",
    "photo_11.jpg": "https://pixel-p1.s3.sa-east-1.amazonaws.com/doctor/photos/ed1f20fc/ed1f20fc-33a7-4dc6-9a50-887b16b0c2d4_large.jpg",
    "photo_12.jpg": "https://pixel-p1.s3.sa-east-1.amazonaws.com/doctor/photos/7f17721a/7f17721a-b645-45d3-a9f1-10355af51baf_large.jpg",
    "photo_13.jpg": "https://pixel-p1.s3.sa-east-1.amazonaws.com/doctor/photos/cf513dc8/cf513dc8-5651-4728-b05c-5bc01485ffb1_large.jpg",
}

target_dir = os.path.join(os.path.dirname(__file__), "..", "public", "assets", "images")
os.makedirs(target_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for filename, url in images.items():
    filepath = os.path.join(target_dir, filename)
    print(f"Downloading {filename} from {url}...")
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Saved to {filepath}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")

print("All images downloaded successfully!")
