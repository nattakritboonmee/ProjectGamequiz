---เปลี่ยนชื่อหมวดหมู่อันเก่า---
UPDATE categories 
SET name = 'FullStack' 
WHERE id = 1;

UPDATE categories 
SET name = 'Authentication' 
WHERE id = 2;

---เพิ่มหมวดหมู่อันที่ 3 มา-----
insert into categories(name) values
('FullStack'),('Authentication'),('Web Security & UX');

---เพิ่ม ตัวเลือก C D ----
ALTER TABLE questions 
  ADD COLUMN option_c text,
  ADD COLUMN option_d text;
--- อัปเดทIDหมวดหมู่เพราะมันข้าม ---
UPDATE categories SET id = 3 WHERE id = 4;
SELECT setval(pg_get_serial_sequence('categories', 'id'), (SELECT MAX(id) FROM categories));

DELETE FROM questions 
WHERE id IN (1, 2, 3, 4);

SELECT setval(pg_get_serial_sequence('questions', 'id'), (SELECT MAX(id) FROM questions));
insert into categories(name) values
('FullStack'),('Authentication'),('Web Security & UX');
---เพิ่มคำถาม---

---หมวดFull Stack---
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer) 
VALUES 
(1,'ถ้าอาจารย์ต้องการเพิ่มความสามารถ ลบหนังสือตาม id โดยกระทบโค้ดเดิมให้น้อยที่สุด การออกแบบแบบใดเหมาะสมที่สุด','แก้ทุก route เดิมให้ทำ DELETE ได้ด้วย','สร้าง db.js ใหม่แทนของเดิม','เพิ่ม route ใหม่, เพิ่ม controller ใหม่, เพิ่ม model function ใหม่','ย้ายระบบทั้งหมดไป frontend','เพิ่ม route ใหม่, เพิ่ม controller ใหม่, เพิ่ม model function ใหม่'),

(1,'ถ้าอาจารย์ต้องการให้ค้นหาหนังสือตามชื่อจาก URL แบบ /api/books/search?title=node ค่าคำค้นควรอ่านจากที่ใด','res.query.title','req.params.title','req.body.title','req.query.title','req.query.title'),

(1,'ใน controller ของ route GET /api/books/:id หากนิสิตลืมแปลง req.params.id เป็นตัวเลข ปัญหาใดมีโอกาสเกิดขึ้นมากที่สุด','การค้นหาข้อมูลอาจไม่ตรงชนิดข้อมูลที่คาดหวัง','req.body จะเป็น null','route จะกลายเป็น POST','browser จะ block request อัตโนมัติ','การค้นหาข้อมูลอาจไม่ตรงชนิดข้อมูลที่คาดหวัง'),

(1,'นิสิตสร้างหน้าเว็บที่กดปุ่ม Load Books แล้ว frontend เรียก fetch("/api/books") แต่ browser แจ้ง 404 ปัญหาที่เป็นไปได้มากที่สุดคืออะไร','express.json() ยังไม่ได้เปิดใช้','backend ไม่มี route ที่ตรงกับ GET /api/books','req.body ไม่มีค่า','PostgreSQL ไม่มีตาราง books','backend ไม่มี route ที่ตรงกับ GET /api/books'),

(1,'หาก frontend ส่งข้อมูลเพิ่มหนังสือใหม่มาแล้ว backend ตอบ 500 ทันที สาเหตุใดเหมาะสมที่สุดที่ควรตรวจเป็นอันดับต้น ๆ','ปุ่มใน HTML เป็นสีผิด','route ต้องใช้ DELETE แทน POST','CSS ยังไม่ถูกโหลด','query PostgreSQL หรือการเชื่อมต่อฐานข้อมูลอาจผิดพลาด','query PostgreSQL หรือการเชื่อมต่อฐานข้อมูลอาจผิดพลาด'),

(1,'หาก model คืนค่าหนังสือทั้งหมดได้ถูกต้อง แต่หน้าเว็บยังไม่แสดงรายการ ปัญหาน่าจะอยู่ที่ส่วนใดมากที่สุด','SQL ต้องเปลี่ยนเป็น UPDATE','db.js แน่นอน','PostgreSQL เท่านั้น','frontend ที่ยังไม่เอาข้อมูลไป render ลง DOM','frontend ที่ยังไม่เอาข้อมูลไป render ลง DOM'),

(1,'สมมติ route สำหรับเพิ่มหนังสือใหม่เขียนเป็น POST /api/books แล้วนิสิตทดสอบผ่าน browser address bar โดยพิมพ์ URL ตรง ๆ แต่เพิ่มข้อมูลไม่สำเร็จ เหตุผลที่สมเหตุสมผลที่สุดคืออะไร','browser address bar ส่งคำขอแบบ GET ไม่ใช่ POST','PostgreSQL รับได้เฉพาะ PUT','route POST ใช้ได้เฉพาะกับ CSS','req.params หายไปเพราะใช้ browser','browser address bar ส่งคำขอแบบ GET ไม่ใช่ POST'),

(1,'ถ้าต้องการให้ระบบส่งกลับเฉพาะบางฟิลด์ เช่น id, title, author แทนที่จะใช้ทุกคอลัมน์จากตาราง เหตุผลที่ดีที่สุดคืออะไร','เพราะ PostgreSQL ห้ามใช้ SELECT *','เพื่อให้ SQL ดูยาวขึ้น','เพื่อลดข้อมูลที่ไม่จำเป็นและควบคุม response ให้ชัดเจน','เพื่อทำให้ route ไม่ต้องมี controller','เพื่อลดข้อมูลที่ไม่จำเป็นและควบคุม response ให้ชัดเจน'),

(1,'ถ้านิสิตต่อ string SQL จากค่าที่ผู้ใช้กรอกโดยตรง เช่น คำค้นหนังสือ แล้วระบบใช้งานได้จริง สิ่งใดคือความเสี่ยงสำคัญที่สุด','Browser จะปิดเอง','Route จะกลายเป็น static file','SQL Injection','CSS เพี้ยน','SQL Injection'),

(1,'ถ้าโค้ดใน controller มีหน้าที่ทั้ง query ฐานข้อมูลหลายบรรทัด ตรวจ validation และจัดรูปแบบ response ยาวมาก การปรับใดเหมาะสมที่สุดตามแนว MVC','ย้าย SQL ไปไว้ใน model เพื่อลดภาระของ controller','รวมทุกไฟล์กลับมาเป็น app.js เดียว','ย้ายทุกอย่างไปไว้ใน route','ย้ายทั้งหมดไป frontend','ย้าย SQL ไปไว้ใน model เพื่อลดภาระของ controller');



---คำถามAuthentication---
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer) 
VALUES 
(2,'ข้อใดอธิบายความต่างระหว่าง Authentication และ Authorization ได้ถูกต้องที่สุด','Authentication ใช้หลัง Authorization เสมอ','Authentication ใช้ กับ admin เท่านั้น ส่วน Authorization ใช้กับ user ทั่วไป','Authentication ยืนยันว่าเป็นใคร ส่วน Authorization ตรวจว่าเข้าถึงอะไรได้','Authentication ตรวจสิทธิ์ ส่วน Authorization ตรวจตัวตน','Authentication ยืนยันว่าเป็นใคร ส่วน Authorization ตรวจว่าเข้าถึงอะไรได้'),

(2,'ในระบบ login ที่ออกแบบถูกต้อง ขั้นตอนใดควรเกิดขึ้นหลังจากผู้ใช้กรอก email และ password','สร้าง token ทันที แล้วค่อยตรวจรหัสผ่าน','ค้นหาผู้ใช้ แล้วเทียบ password ที่กรอกกับ hash ที่เก็บไว้','เทียบ password กับ plain text','redirect ก่อนตรวจสอบ','ค้นหาผู้ใช้ แล้วเทียบ password ที่กรอกกับ hash ที่เก็บไว้'),

(2,'เพราะเหตุใดการเก็บ password แบบ plain text จึงอันตรายมาก','ทำให้ login ช้าลง','ทำให้ token ใช้งานไม่ได้','หากฐานข้อมูลรั่ว รหัสผ่านจริงจะถูกเปิดเผยทันที','ทำให้ session หมดอายุเร็วขึ้น','หากฐานข้อมูลรั่ว รหัสผ่านจริงจะถูกเปิดเผยทันที'),

(2,'โค้ดที่เปรียบเทียบ password ตรง ๆ มีปัญหาอะไร','ควรตอบ 200 เสมอ','ไม่ควรใช้ session','ใช้ req.body ไม่ได้','เปรียบเทียบ password ตรง ๆ แทน hash','เปรียบเทียบ password ตรง ๆ แทน hash'),

(2,'ใน session-based authentication ข้อใดถูกต้อง','browser เก็บข้อมูลผู้ใช้ทั้งหมด','server เป็นผู้จำสถานะหลัก','logout ต้องรอหมดอายุเท่านั้น','token ถูกส่งทุกครั้ง','server เป็นผู้จำสถานะหลัก'),

(2,'ระบบใดเหมาะกับ token-based authentication มากที่สุด','ไม่มี login','ไม่มี API','เว็บแบบดั้งเดิม','frontend/backend แยกกัน','frontend/backend แยกกัน'),

(2,'middleware ที่ไม่ผ่านการ login ควรใช้ status code ใด','500','403','200','401','401'),

(2,'ข้อใดเป็น Authorization','browser ส่ง cookie','login สำเร็จ','สร้าง session','ผู้ใช้ทั่วไปเข้า /admin ไม่ได้','ผู้ใช้ทั่วไปเข้า /admin ไม่ได้'),

(2,'Token คืออะไร','session id เท่านั้น','ข้อมูลที่ server จำ','หลักฐานที่ client ถือและส่งกลับ','password ที่ hash','หลักฐานที่ client ถือและส่งกลับ'),

(2,'ปัญหาของ route ที่ไม่มี middleware คืออะไร','ไม่มีการตรวจสอบตัวตน','ใช้ GET ไม่ได้','ไม่ควรใช้ JSON','ต้องสร้าง token ใหม่','ไม่มีการตรวจสอบตัวตน');






--WebSecurity & UX --

INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer) 
VALUES 
(3, 'SQL Injection คืออะไร', 'การตกแต่งหน้าเว็บด้วย SQL', 'การฉีดคำสั่ง SQL อันตรายผ่าน input เพื่อขโมยข้อมูล', 'การสำรองข้อมูลฐานข้อมูล', 'การทำ index ให้ฐานข้อมูลทำงานเร็วขึ้น', 'การฉีดคำสั่ง SQL อันตรายผ่าน input เพื่อขโมยข้อมูล'),

(3, 'วิธีใดป้องกัน SQL Injection ได้ดีที่สุด', 'ใช้ String Concatenation', 'ใช้ CSS ป้องกัน', 'ใช้ Prepared Statements (Parameterized Queries)', 'ไม่รับ input จากผู้ใช้เลย', 'ใช้ Prepared Statements (Parameterized Queries)'),

(3, 'XSS (Cross-Site Scripting) มีลักษณะอย่างไร', 'เจาะจงโจมตีฐานข้อมูลโดยตรง', 'การหลอกให้ผู้ใช้กรอกรหัสผ่านในหน้าเว็บปลอม', 'การฝัง Script อันตรายให้รันบน Browser ของผู้ใช้อื่น', 'การยิง Request จำนวนมากเพื่อให้เว็บล่ม', 'การฝัง Script อันตรายให้รันบน Browser ของผู้ใช้อื่น'),

(3, 'การตั้งค่า Cookie แบบ "HttpOnly" มีประโยชน์อย่างไร', 'ทำให้ Cookie เก็บข้อมูลได้มากขึ้น', 'ป้องกันไม่ให้ JavaScript เข้าถึง Cookie ได้ (กัน XSS ขโมย Session)', 'ช่วยให้โหลดหน้าเว็บได้เร็วขึ้น', 'ทำให้ Cookie มีอายุการใช้งานไม่จำกัด', 'ป้องกันไม่ให้ JavaScript เข้าถึง Cookie ได้ (กัน XSS ขโมย Session)'),

(3, 'HTTPS สำคัญกว่า HTTP อย่างไรในแง่ของ Security', 'ทำให้รูปภาพในเว็บสวยขึ้น', 'รองรับการใช้งานผ่านมือถือได้ดีกว่า', 'มีการเข้ารหัสข้อมูล (Encryption) ระหว่างรับส่ง', 'ประหยัด Bandwidth ของ Server', 'มีการเข้ารหัสข้อมูล (Encryption) ระหว่างรับส่ง'),

(3, 'ในแง่ UX "Feedback" ที่ดีเมื่อผู้ใช้กดปุ่มบันทึกข้อมูลคืออะไร', 'ไม่มีอะไรเกิดขึ้นเพื่อให้ผู้ใช้รอ', 'มี Loading Spinner หรือข้อความแจ้งว่าบันทึกสำเร็จ', 'เปลี่ยนสีพื้นหลังของเว็บทั้งหมดทันที', 'เด้งหน้าต่าง Error ตลอดเวลาเพื่อความปลอดภัย', 'มี Loading Spinner หรือข้อความแจ้งว่าบันทึกสำเร็จ'),

(3, 'หลักการ "Least Privilege" หมายถึงอะไร', 'การให้สิทธิ์ผู้ใช้ทุกคนเข้าถึง Admin ได้', 'การให้สิทธิ์เท่าที่จำเป็นต่อการใช้งานเท่านั้น', 'การไม่ให้สิทธิ์ใครเลยแม้แต่เจ้าของระบบ', 'การเก็บข้อมูลรหัสผ่านไว้ในเครื่องของผู้ใช้', 'การให้สิทธิ์เท่าที่จำเป็นต่อการใช้งานเท่านั้น'),

(3, 'การใช้ Captcha มีวัตถุประสงค์หลักเพื่ออะไร', 'ช่วยให้หน้าเว็บดูทันสมัย', 'คัดกรองว่าผู้ใช้เป็นมนุษย์ไม่ใช่ Bot', 'ช่วยเก็บสถิติการเข้าชมเว็บ', 'ใช้ในการเข้ารหัสรหัสผ่าน', 'คัดกรองว่าผู้ใช้เป็นมนุษย์ไม่ใช่ Bot'),

(3, 'หากต้องการให้ผู้ใช้กรอกฟอร์มได้ง่ายขึ้น (Better UX) ข้อใดถูกต้อง', 'มีฟิลด์ให้กรอกเยอะที่สุดในหน้าเดียว', 'มีการระบุชัดเจนว่าฟิลด์ไหนจำเป็น (Required)', 'ใช้ตัวอักษรสีจางๆ ที่อ่านยากเพื่อความเท่', 'ไม่ใส่คำอธิบายฟิลด์เลยให้ผู้ใช้เดาเอง', 'มีการระบุชัดเจนว่าฟิลด์ไหนจำเป็น (Required)'),

(3, 'CORS  คืออะไร', 'การจำกัดสิทธิ์การเข้าถึงทรัพยากรจาก Domain อื่น', 'การแชร์รหัสผ่านระหว่าง Browser', 'การทำให้เว็บรองรับทุกภาษาในโลก', 'การส่งข้อมูลผ่านดาวเทียม', 'การจำกัดสิทธิ์การเข้าถึงทรัพยากรจาก Domain อื่น');


























