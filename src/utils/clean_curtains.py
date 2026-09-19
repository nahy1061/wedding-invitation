from PIL import Image
import numpy as np

def clean_checkerboard(src_path, dst_path):
    img = Image.open(src_path).convert('RGBA')
    data = np.array(img, dtype=np.float32)
    
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    
    diff = np.maximum(np.maximum(np.abs(r - g), np.abs(g - b)), np.abs(r - b))
    brightness = (r + g + b) / 3.0
    
    is_bg = (diff < 12) & (brightness > 220)
    
    alpha = np.ones_like(r) * 255.0
    alpha[is_bg] = 0.0
    
    near_bg = (diff < 18) & (brightness > 215) & (~is_bg)
    alpha[near_bg] = ((diff[near_bg] - 12) / 6.0) * 255.0
    
    data[:,:,3] = alpha
    result = Image.fromarray(np.uint8(data))
    result.save(dst_path, 'PNG')
    print(f'Successfully processed and saved {dst_path}')

clean_checkerboard('src/assets/images/left_curtain.jpeg', 'src/assets/images/left_curtain.png')
clean_checkerboard('src/assets/images/right_curtain.jpeg', 'src/assets/images/right_curtain.png')
clean_checkerboard('src/assets/images/top_curtain.jpeg', 'src/assets/images/top_curtain.png')
